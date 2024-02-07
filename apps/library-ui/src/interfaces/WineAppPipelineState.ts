import { WineAppUpdatedJob } from 'neu-wine-api';

export type WineAppPipelineState = {
  pipelines: Array<{ id: string; jobs: WineAppUpdatedJob[] }>;
};
