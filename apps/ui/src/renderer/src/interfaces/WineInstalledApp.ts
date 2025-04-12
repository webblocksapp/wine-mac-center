import { WineAppConfig } from '@interfaces/WineAppConfig';

export type WineInstalledApp = Omit<WineAppConfig, 'id' | 'appId'> & {
  id: string;
  pid?: number;
  configId: string;
  appPath: string;
};
