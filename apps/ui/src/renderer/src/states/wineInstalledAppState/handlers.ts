import { Flatten } from '@interfaces/Flatten';
import { WineInstalledAppState } from '@interfaces/WineInstalledAppState';

export const listAll = (
  wineInstalledApps: WineInstalledAppState['wineInstalledApps'],
  state: WineInstalledAppState
): WineInstalledAppState => {
  return { ...state, wineInstalledApps };
};

export const patch = (
  appId: string,
  wineInstalledApp: Partial<Flatten<WineInstalledAppState['wineInstalledApps']>>,
  state: WineInstalledAppState
): WineInstalledAppState => {
  return {
    ...state,
    wineInstalledApps: state.wineInstalledApps?.map((item) => {
      if (item.id === appId) {
        return { ...item, ...wineInstalledApp };
      }
      return item;
    })
  };
};
