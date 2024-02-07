import { WineAppPipelineStatus } from 'neu-wine-api';

export type WineAppPipelineState = {
  pipelines: Array<WineAppPipelineStatus>;
};
