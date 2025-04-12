import { WineEngineState } from '@interfaces/WineEngineState';

export const list = (
  wineEngines: WineEngineState['wineEngines'],
  state: WineEngineState
): WineEngineState => {
  return {
    ...state,
    wineEngines
  };
};

export const listDownloadables = (
  wineEnginesDownloadables: WineEngineState['wineEnginesDownloadables'],
  state: WineEngineState
): WineEngineState => {
  return {
    ...state,
    wineEnginesDownloadables
  };
};

export const loaders = (
  loaders: Partial<WineEngineState['loaders']>,
  state: WineEngineState
): WineEngineState => {
  return {
    ...state,
    loaders: { ...state.loaders, ...loaders }
  };
};
