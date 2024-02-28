import { ExitCode, ProcessStatus } from '@constants';
import { SpawnProcessArgs, WineAppConfig, WineAppPipeline } from '@interfaces';
import { clone, createWineApp } from '@utils';
import { v4 as uuid } from 'uuid';

export const createWineAppPipeline = async (options: {
  appConfig: WineAppConfig;
  debug?: boolean;
  outputEveryMs?: number;
}) => {
  const id = uuid();
  const store = { outputEnabled: true, killAllProcesses: false };

  const { name, engineVersion, dxvkEnabled, winetricks, setupExecutablePath } =
    options.appConfig;

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
    _: {},
    onUpdate(fn) {
      this._.onUpdate = (pipelineStatus) => fn(clone(pipelineStatus));
    },
    id,
    kill: () => {
      store.killAllProcesses = true;
    },
    jobs: [
      {
        name: 'Create wine app',
        steps: [
          {
            name: 'Creating wine app',
            script: wineApp.scaffold,
            status: ProcessStatus.Pending,
            output: '',
          },
          {
            name: 'Extracting wine engine',
            script: (args: SpawnProcessArgs) =>
              wineApp.extractEngine(engineVersion, args),
            status: ProcessStatus.Pending,
            output: '',
          },
          {
            name: 'Generating wine prefix',
            script: (args: SpawnProcessArgs) => wineApp.wineboot('', args),
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
          {
            name: 'Running setup executable',
            script: (args: SpawnProcessArgs) =>
              wineApp.runExe(setupExecutablePath, args),
            status: ProcessStatus.Pending,
            output: '',
          },
          {
            name: 'Bundling app',
            script: (args: SpawnProcessArgs) => {
              let executables = options.appConfig.executables || [];

              if (!options.appConfig.executables?.length) {
                const exePath =
                  window.prompt('Type the main executable path') || '';
                executables = [{ path: exePath, main: true }];
              }

              return wineApp.bundleApp(executables, args);
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
          options.debug && console.log('Step - ' + step.name);

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
            onStdOut: (data, updateProcess) => {
              if (store.killAllProcesses) {
                updateProcess('exit');
                step.status = ProcessStatus.Cancelled;
                return;
              }

              step.status = ProcessStatus.InProgress;
              step.output = concatDataToOutput(data, step.output);

              handleOutput(() => {
                options.debug && console.log('onStdOut', data);
                this._.onUpdate?.({
                  pipelineId: id,
                  jobs: pipeline.jobs,
                  status: ProcessStatus.InProgress,
                });
              });
            },
            onStdErr: (data, updateProcess) => {
              if (store.killAllProcesses) {
                updateProcess('exit');
                step.status = ProcessStatus.Cancelled;
                return;
              }

              step.status = ProcessStatus.InProgress;
              step.output = concatDataToOutput(data, step.output);

              handleOutput(() => {
                options.debug && console.log('onStdErr', data);
                this._.onUpdate?.({
                  pipelineId: id,
                  jobs: pipeline.jobs,
                  status: ProcessStatus.InProgress,
                });
              });
            },
            onExit: (data) => {
              step.output = concatDataToOutput(data, step.output);

              if (data === ExitCode.SuccessfulExecution) {
                step.status = ProcessStatus.Success;
              }

              if (data === ExitCode.Error) {
                step.status = ProcessStatus.Error;
              }

              handleOutput(() => {
                options.debug && console.log('onExit', data);
                this._.onUpdate?.({
                  pipelineId: id,
                  jobs: pipeline.jobs,
                  status: ProcessStatus.InProgress,
                });
              });
            },
          });
        }
      }
    },
  };

  return pipeline;
};
