import { WineAppPipelineStatus as BaseWineAppPipelineStatus } from '@interfaces/WineAppPipelineStatus';

export type WineAppPipelineStatusItem = BaseWineAppPipelineStatus & {
  appConfigId: string;
};
