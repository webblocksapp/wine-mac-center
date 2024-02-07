import { WineAppJob, WineAppUpdatedJob } from '@interfaces';

export type WineAppPipeline = {
  _: {
    onUpdate?: (currentJobs: Array<WineAppUpdatedJob>) => void;
  };
  onUpdate: (fn: (currentJobs: Array<WineAppUpdatedJob>) => void) => void;
  jobs: WineAppJob[];
  run: () => void;
};
