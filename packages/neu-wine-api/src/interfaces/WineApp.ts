import { WineAppExecutable, WinetricksOptions } from '@interfaces';

export type WineApp = {
  id?: string;
  name: string;
  engineVersion: string;
  setupExecutablePath: string;
  winetricks?: { verbs: string[]; options: WinetricksOptions };
  dxvkEnabled: boolean;
  executables?: Array<WineAppExecutable>;
};
