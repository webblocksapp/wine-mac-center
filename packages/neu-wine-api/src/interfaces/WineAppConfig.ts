import { WineAppExecutable, WinetricksOptions } from '@interfaces';

export type WineAppConfig = {
  appId: string;
  iconURL: string;
  name: string;
  engineVersion: string;
  setupExecutableURLs?: string[];
  setupExecutablePath?: string;
  winetricks?: { verbs: string[]; options?: WinetricksOptions };
  dxvkEnabled: boolean;
  executables?: Array<WineAppExecutable>;
};
