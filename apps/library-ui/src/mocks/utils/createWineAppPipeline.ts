import { sleep } from '@reactjs-ui/core';
import { faker } from '@faker-js/faker';
import {
  createWineAppPipeline as baseCreateWineAppPipeline,
  spawnProcess,
} from 'neu-wine-api';

export const createWineAppPipeline: typeof baseCreateWineAppPipeline = async (
  options,
) => {
  const pipeline = await baseCreateWineAppPipeline(options);

  pipeline.jobs = pipeline.jobs.map((job) => ({
    ...job,
    steps: job.steps.map((step) => ({
      ...step,
      script: async (args) => {
        await sleep(faker.number.int({ min: 3000, max: 7000 }));
        return spawnProcess('echo "Script executed..."', args);
      },
    })),
  }));

  return pipeline;
};
