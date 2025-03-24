import { WineAppExecutable, WinetricksOptions } from '@interfaces';

export type WineAppConfig = {
  id: string;
  appId?: string;
  iconURL?: string;
  iconFile?: ArrayBuffer;
  artworkFile?: ArrayBuffer;
  name: string;
  engineVersion: string;
  engineURLs: string[];
  setupExecutableURLs?: string[];
  setupExecutablePath?: string;
  winetricks?: { verbs: string[]; options?: WinetricksOptions };
  dxvkEnabled: boolean;
  executables?: Array<WineAppExecutable>;
};
