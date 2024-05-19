import { WineInstalledAppState } from '@interfaces';

export const listAll = (
  wineInstalledApps: WineInstalledAppState['wineInstalledApps'],
  state: WineInstalledAppState,
): WineInstalledAppState => {
  return { ...state, wineInstalledApps };
};
