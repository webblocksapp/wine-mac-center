import { WineAppConfig as BaseWineAppConfig } from 'neu-wine-api';

export type WineAppConfig = BaseWineAppConfig & {
  keyName: string;
  version?: string;
  imgSrc?: string;
  scriptUrl?: string;
};
