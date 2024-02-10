import { ProcessStatus } from '@constants';
import { SpawnProcessArgs, WineAppConfig, WineAppPipeline } from '@interfaces';
import { clone, createWineApp } from '@utils';
import { v4 as uuid } from 'uuid';

export const createWineAppPipeline = async (options: {
  appConfig: WineAppConfig;
  debug?: boolean;
  outputEveryMs?: number;
}) => {
  const id = uuid();
  let outputEnabled = true;

  const { name, engineVersion, dxvkEnabled, winetricks, setupExecutablePath } =
    options.appConfig;

  const handleOutput = (callbackFn: Function) => {
    if (outputEnabled) {
      callbackFn();
      outputEnabled = false;
      setTimeout(() => {
        outputEnabled = true;
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

  const concatDataToOutput = (data: string, output = '') =>
    `${output || ''}\n${data}`;

  const wineApp = await createWineApp(name);
  const pipeline: WineAppPipeline = {
    _: {},
    onUpdate(fn) {
      this._.onUpdate = (pipelineStatus) => fn(clone(pipelineStatus));
    },
    id,
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
          await step.script({
            onStdOut: (data) => {
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
            onStdErr: (data) => {
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
