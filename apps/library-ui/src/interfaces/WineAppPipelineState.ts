import { WineAppJob } from 'neu-wine-api';

export type WineAppPipelineState = {
  pipelines: Array<{ id: string; jobs: WineAppJob[] }>;
};
