import { WineAppExecutable, WinetricksOptions } from '@interfaces';

export type WineAppConfig = {
  id?: string;
  name: string;
  engineVersion: string;
  setupExecutablePath: string;
  winetricks?: { verbs: string[]; options?: WinetricksOptions };
  dxvkEnabled: boolean;
  executables?: Array<WineAppExecutable>;
};
