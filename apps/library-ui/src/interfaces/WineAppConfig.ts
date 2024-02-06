import { WineAppConfig as BaseWineAppConfig } from 'neu-wine-api';

export type WineAppConfig = Partial<BaseWineAppConfig> & {
  version?: string;
  imgSrc?: string;
  scriptUrl?: string;
};
