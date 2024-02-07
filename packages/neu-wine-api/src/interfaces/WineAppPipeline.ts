import { WineAppJobWithScript, WineAppPipelineStatus } from '@interfaces';

export type WineAppPipeline = {
  _: {
    onUpdate?: (status: WineAppPipelineStatus) => void;
  };
  id: string;
  onUpdate: (fn: (status: WineAppPipelineStatus) => void) => void;
  jobs: WineAppJobWithScript[];
  run: () => void;
};
