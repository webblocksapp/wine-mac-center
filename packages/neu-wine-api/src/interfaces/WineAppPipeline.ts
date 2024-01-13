import { WineAppJob } from '@interfaces';

export type WineAppPipeline = {
  onUpdate?: (timestamp: number) => void;
  jobs: WineAppJob[];
  run: () => void;
};
