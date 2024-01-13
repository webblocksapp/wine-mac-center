import {
  SpawnProcessArgs,
  WineAppConfig,
  WineAppJob,
  WineAppPipeline,
} from '@interfaces';
import { createWineApp } from '@utils';

export const createWineAppPipeline = async (options: {
  appConfig: WineAppConfig;
}) => {
  const { name, engineVersion, dxvkEnabled, winetricks } = options.appConfig;

  const getTime = () => new Date().getTime();

  const buildWinetricksSteps = () => {
    const steps: WineAppJob['steps'] = [];
    const verbs = winetricks?.verbs || [];

    for (let verb of verbs) {
      steps.push({
        name: `Running winetrick ${verb}`,
        script: (args: SpawnProcessArgs) =>
          wineApp.winetrick(verb, args, winetricks?.options),
        status: 'pending',
        output: '',
      });
    }

    return steps;
  };

  const concatDataToOutput = (data: string, output = '') =>
    `${output || ''}\n${data}`;

  const wineApp = await createWineApp(name);
  const pipeline: WineAppPipeline = {
    jobs: [
      {
        name: 'Create wine app',
        steps: [
          {
            name: 'Creating wine app',
            script: wineApp.scaffold,
            status: 'pending',
            output: '',
          },
          {
            name: 'Extracting wine engine',
            script: (args: SpawnProcessArgs) =>
              wineApp.extractEngine(engineVersion, args),
            status: 'pending',
            output: '',
          },
          {
            name: 'Generating wine prefix',
            script: (args: SpawnProcessArgs) => wineApp.wineboot('', args),
            status: 'pending',
            output: '',
          },
          ...(dxvkEnabled
            ? [
                {
                  name: 'Enabling DXVK',
                  script: (args: SpawnProcessArgs) =>
                    wineApp.winetrick('dxvk1102', args),
                  status: 'pending',
                  output: '',
                },
              ]
            : []),
          ...buildWinetricksSteps(),
          {
            name: 'Running setup executable',
            script: (args: SpawnProcessArgs) => {
              const exePath =
                window.prompt('Type the setup executable path') || '';
              return wineApp.runExe(exePath, args);
            },
            status: 'pending',
            output: '',
          },
          {
            name: 'Bundling app',
            script: (args: SpawnProcessArgs) => {
              const exePath =
                window.prompt('Type the main executable path') || '';
              return wineApp.bundleApp({ exePath }, args);
            },
            status: 'pending',
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
              console.log('stdOut', data);
              step.output = concatDataToOutput(data, step.output);
              this.onUpdate?.(getTime());
            },
            onStdErr: (data) => {
              console.log('stdErr', data);
              step.output = concatDataToOutput(data, step.output);
              this.onUpdate?.(getTime());
            },
            onExit: (data) => {
              console.log('exit', data);
              step.output = concatDataToOutput(data, step.output);
              this.onUpdate?.(getTime());
            },
          });
        }
      }
    },
  };

  return {
    pipeline,
  };
};
