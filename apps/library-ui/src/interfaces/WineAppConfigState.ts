import { EntityState, WineAppConfig } from '@interfaces';

export type WineAppConfigState = {
  wineAppsConfigs: Array<WineAppConfig & { entityState?: EntityState }>;
  loaders: {
    listingAll: boolean;
  };
};
