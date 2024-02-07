import { WineAppState } from '@interfaces';

export const listAll = (
  wineApps: WineAppState['wineApps'],
  state: WineAppState
): WineAppState => {
  return { ...state, wineApps };
};
