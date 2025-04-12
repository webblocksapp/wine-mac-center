import { WineEngineDownloadable } from '@interfaces/WineEngineDownloadable';

export type WineEngineState = {
  wineEngines?: string[];
  wineEnginesDownloadables?: WineEngineDownloadable[];
  loaders: {
    listing: boolean;
    listingDownloadables: boolean;
  };
};
