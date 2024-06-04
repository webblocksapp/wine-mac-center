import { WineEngineDownloadable } from '@interfaces';

export type WineEngineState = {
  wineEngines?: string[];
  wineEnginesDownloadables?: WineEngineDownloadable[];
  loaders: {
    listing: boolean;
    listingDownloadables: boolean;
  };
};
