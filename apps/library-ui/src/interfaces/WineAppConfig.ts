import { WineAppConfig as BaseWineAppConfig } from 'neu-wine-api';

export type WineAppConfig = BaseWineAppConfig & {
  version?: string;
  imgSrc?: string;
  scriptUrl?: string;
};
