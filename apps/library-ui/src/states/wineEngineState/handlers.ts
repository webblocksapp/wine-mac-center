import { WineEngineState } from '@interfaces';

export const list = (
  wineEngines: WineEngineState['wineEngines'],
  state: WineEngineState
): WineEngineState => {
  return {
    ...state,
    wineEngines,
  };
};

export const loaders = (
  loaders: Partial<WineEngineState['loaders']>,
  state: WineEngineState
): WineEngineState => {
  return {
    ...state,
    loaders: { ...state.loaders, ...loaders },
  };
};
