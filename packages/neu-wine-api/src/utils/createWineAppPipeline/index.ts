import { ExitCode, ProcessStatus } from '@constants';
import { SpawnProcessArgs, WineAppConfig, WineAppPipeline } from '@interfaces';
import { filesystem } from '@neutralinojs/lib';
import { clone, createWineApp, useEnv } from '@utils';
import { v4 as uuid } from 'uuid';

export const createWineAppPipeline = async (options: {
  appConfig: WineAppConfig;
  debug?: boolean;
  outputEveryMs?: number;
  promptMainExeCallback?: () => Promise<string>;
}) => {
  const id = uuid();
  const store = { outputEnabled: true, killAllProcesses: false };
  const env = useEnv();

  const {
    iconURL,
    iconFile,
    artworkFile,
    name,
    engineVersion,
    engineURLs,
    dxvkEnabled,
    winetricks,
    setupExecutableURLs,
    setupExecutablePath,
  } = options.appConfig;

  const checkEngineExists = async () => {
    const ENGINES_PATH = `${env.get().WINE_ENGINES_PATH}`;
    const entries = (await filesystem.readDirectory(ENGINES_PATH))
      .filter((item) => item.type === 'FILE')
      .map((item) => item.entry);
    return entries.includes(`${engineVersion}.tar.7z`);
  };

  const ENGINE_EXISTS = await checkEngineExists();

  const handleOutput = (callbackFn: Function) => {
    if (store.outputEnabled) {
      callbackFn();
      store.outputEnabled = false;
      setTimeout(() => {
        store.outputEnabled = true;
      }, options.outputEveryMs || 100);
    }
  };

  const buildWinetricksSteps = () => {
    const steps = [];
    const verbs = winetricks?.verbs || [];

    for (let verb of verbs) {
      steps.push({
        name: `Running winetrick ${verb}`,
        script: (args: SpawnProcessArgs) =>
          wineApp.winetrick(verb, args, winetricks?.options),
        status: ProcessStatus.Pending,
        output: '',
      });
    }

    return steps;
  };

  const concatDataToOutput = (data: string | number, output = '') =>
    `${output || ''}\n${data}`;

  const wineApp = await createWineApp(name);
  const pipeline: WineAppPipeline = {
    _: {
      std(action, step, data, updateProcess) {
        options.debug && console.log(action, step.name);

        if (store.killAllProcesses) {
          updateProcess?.('exit');
          step.status = ProcessStatus.Cancelled;
          return;
        }

        step.status = ProcessStatus.InProgress;
        step.output = concatDataToOutput(data, step.output);

        if (data === ExitCode.SuccessfulExecution) {
          step.status = ProcessStatus.Success;
        }

        if (data === ExitCode.Error) {
          step.status = ProcessStatus.Error;
        }

        handleOutput(() => {
          options.debug && console.log(action, data);
          this.onUpdate?.({
            pipelineId: id,
            jobs: pipeline.jobs,
            status: ProcessStatus.InProgress,
          });
        });
      },
    },
    onUpdate(fn) {
      this._.onUpdate = (pipelineStatus) => fn(clone(pipelineStatus));
    },
    id,
    getInitialStatus: () =>
      clone({
        pipelineId: id,
        jobs: pipeline.jobs,
        status: ProcessStatus.Cancelled,
      }),
    kill: () => {
      store.killAllProcesses = true;
    },
    jobs: [
      {
        name: 'Create wine app',
        steps: [
          {
            name: 'Creating wine app',
            script: (args) =>
              wineApp.scaffold(
                {
                  appIconURL: iconURL,
                  appIconFile: iconFile,
                  appArtWorkFile: artworkFile,
                },
                args,
              ),
            status: ProcessStatus.Pending,
            output: '',
          },
          ...(ENGINE_EXISTS
            ? []
            : [
                {
                  name: 'Downloading wine engine',
                  script: (args: SpawnProcessArgs) =>
                    wineApp.downloadWineEngine(engineURLs, engineVersion, args),
                  status: ProcessStatus.Pending,
                  output: '',
                },
              ]),
          {
            name: 'Extracting wine engine',
            script: (args) => wineApp.extractEngine(engineVersion, args),
            status: ProcessStatus.Pending,
            output: '',
          },
          {
            name: 'Generating wine prefix',
            script: (args) => wineApp.wineboot('', args),
            status: ProcessStatus.Pending,
            output: '',
          },
          ...(dxvkEnabled
            ? [
                {
                  name: 'Enabling DXVK',
                  script: (args: SpawnProcessArgs) =>
                    wineApp.winetrick('dxvk1102', args),
                  status: ProcessStatus.Pending,
                  output: '',
                },
              ]
            : []),
          ...buildWinetricksSteps(),
          ...(setupExecutableURLs
            ? [
                {
                  name: 'Downloading setup executable',
                  script: () => wineApp.setSetupExe(setupExecutableURLs),
                  status: ProcessStatus.Pending,
                  output: '',
                },
              ]
            : []),
          {
            name: 'Running setup executable',
            script: (args) => {
              return wineApp.runExe(
                wineApp.getAppConfig().setupExecutablePath ||
                  setupExecutablePath ||
                  '',
                args,
              );
            },
            status: ProcessStatus.Pending,
            output: '',
          },
          {
            name: 'Bundling app',
            script: async (args) => {
              let executables = options.appConfig.executables || [];

              if (!options.appConfig.executables?.length) {
                const exePath =
                  (await options.promptMainExeCallback?.()) ||
                  (window as Window).prompt('Type the main executable path') ||
                  '';
                executables = [{ path: exePath, main: true }];
              }

              return wineApp.bundleApp(
                { executables, configId: options.appConfig.id },
                args,
              );
            },
            status: ProcessStatus.Pending,
            output: '',
          },
        ],
      },
    ],
    async run() {
      for (const job of pipeline.jobs) {
        for (const step of job.steps) {
          if (store.killAllProcesses) {
            step.status = ProcessStatus.Cancelled;
            this._.onUpdate?.({
              pipelineId: id,
              jobs: pipeline.jobs,
              status: ProcessStatus.Cancelled,
            });
            continue;
          }

          await step.script({
            onStdOut: (data, updateProcess) =>
              this._.std('stdOut', step, data, updateProcess),
            onStdErr: (data, updateProcess) =>
              this._.std('stdErr', step, data, updateProcess),
            onExit: (data) => this._.std('exit', step, data),
          });
        }
      }

      if (!store.killAllProcesses) {
        this._.onUpdate?.({
          pipelineId: id,
          jobs: pipeline.jobs,
          status: ProcessStatus.Success,
        });
      }
    },
  };

  return pipeline;
};
