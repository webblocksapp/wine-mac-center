import {
  ProcessStatus,
  SpawnProcessArgs,
  WineAppConfig,
  WineAppJob,
  WineAppJobWithScript,
  WineAppPipeline,
} from '@interfaces';
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
    outputEnabled && callbackFn();
    outputEnabled = false;
    setTimeout(() => {
      outputEnabled = true;
    }, options.outputEveryMs || 100);
  };

  const buildWinetricksSteps = () => {
    const steps = [];
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

  const cleanJobNoSerializableData = (jobs: WineAppJobWithScript[]) => {
    return jobs.map((job) => {
      (job as WineAppJob).steps = job.steps.map(
        ({ script: _, ...step }) => step
      );
      return job;
    }) as WineAppJob[];
  };

  const concatDataToOutput = (data: string, output = '') =>
    `${output || ''}\n${data}`;

  const buildPipelineStatus = (data: {
    jobs: WineAppJobWithScript[];
    status: ProcessStatus;
  }) => {
    return clone({
      id,
      jobs: cleanJobNoSerializableData(data.jobs),
      status: data.status,
    });
  };

  const wineApp = await createWineApp(name);
  const pipeline: WineAppPipeline = {
    _: {},
    onUpdate(fn) {
      this._.onUpdate = (currentJobs) => fn(currentJobs);
    },
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
            script: (args: SpawnProcessArgs) =>
              wineApp.runExe(setupExecutablePath, args),
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
              options.debug && console.log('stdOut', data);
              step.output = concatDataToOutput(data, step.output);
              handleOutput(() => {
                this._.onUpdate?.(
                  buildPipelineStatus({
                    jobs: pipeline.jobs,
                    status: 'inProgress',
                  })
                );
              });
            },
            onStdErr: (data) => {
              options.debug && console.log('stdErr', data);
              step.output = concatDataToOutput(data, step.output);
              handleOutput(() => {
                this._.onUpdate?.(
                  buildPipelineStatus({
                    jobs: pipeline.jobs,
                    status: 'inProgress',
                  })
                );
              });
            },
            onExit: (data) => {
              options.debug && console.log('exit', data);
              step.output = concatDataToOutput(data, step.output);
              handleOutput(() => {
                this._.onUpdate?.(
                  buildPipelineStatus({
                    jobs: pipeline.jobs,
                    status: 'inProgress',
                  })
                );
              });
            },
          });
        }
      }
    },
  };

  return pipeline;
};
