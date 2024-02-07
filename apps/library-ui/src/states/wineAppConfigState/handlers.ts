import { WineAppConfigState } from '@interfaces';

export const patch = (
  wineAppConfig: WineAppConfigState['wineAppsConfigs'][0],
  state: WineAppConfigState
): WineAppConfigState => {
  if (state.wineAppsConfigs.some((item) => item.appId == wineAppConfig.appId)) {
    return {
      ...state,
      wineAppsConfigs: state.wineAppsConfigs.map((item) => {
        if (item.appId == wineAppConfig.appId) {
          return {
            ...item,
            ...wineAppConfig,
          };
        }
        return item;
      }),
    };
  } else {
    return {
      ...state,
      wineAppsConfigs: [...state.wineAppsConfigs, wineAppConfig],
    };
  }
};
