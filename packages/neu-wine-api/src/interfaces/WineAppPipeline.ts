import { WineAppJob } from '@interfaces';

export type WineAppPipeline = {
  _: {
    onUpdate?: (currentJobs: Array<WineAppJob>) => void;
  };
  onUpdate: (fn: (currentJobs: Array<WineAppJob>) => void) => void;
  jobs: WineAppJob[];
  run: () => void;
};
