import { WineAppConfig } from 'neu-wine-api';

export type WineInstalledApp = Omit<WineAppConfig, 'id' | 'appId'> & {
  id: string;
  configId: string;
  appPath: string;
};
