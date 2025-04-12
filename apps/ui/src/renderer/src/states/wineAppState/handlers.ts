import { WineAppState } from '@interfaces/WineAppState';

export const listAll = (wineApps: WineAppState['wineApps'], state: WineAppState): WineAppState => {
  return { ...state, wineApps };
};
