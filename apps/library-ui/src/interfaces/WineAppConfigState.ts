import { WineAppConfig } from '@interfaces';

export type WineAppConfigState = {
  wineAppsConfigs: Array<WineAppConfig>;
  loaders: {
    listingAll: boolean;
  };
};
