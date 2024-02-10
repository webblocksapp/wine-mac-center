import { WineAppPipelineStatus as BaseWineAppPipelineStatus } from 'neu-wine-api';

export type WineAppPipelineStatus = BaseWineAppPipelineStatus & {
  appId: string;
};
