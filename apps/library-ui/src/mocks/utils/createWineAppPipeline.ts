import {
  createWineAppPipeline as baseCreateWineAppPipeline,
  spawnProcess,
} from 'neu-wine-api';

export const createWineAppPipeline: typeof baseCreateWineAppPipeline = async (
  options
) => {
  const pipeline = await baseCreateWineAppPipeline(options);

  pipeline.jobs = pipeline.jobs.map((job) => ({
    ...job,
    steps: job.steps.map((step) => ({
      ...step,
      script: () => {
        return spawnProcess('echo "Script executed..."');
      },
    })),
  }));

  return pipeline;
};
