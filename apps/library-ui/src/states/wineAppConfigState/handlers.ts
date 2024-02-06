import { WineAppConfigState } from '@interfaces';

export const listAll = (
  wineAppsConfigs: WineAppConfigState['wineAppsConfigs'],
  state: WineAppConfigState
): WineAppConfigState => {
  return { ...state, wineAppsConfigs };
};

export const patch = (
  id: string,
  wineAppConfig: WineAppConfigState['wineAppsConfigs'][0],
  state: WineAppConfigState
): WineAppConfigState => {
  const patchedWineAppsConfigs = state.wineAppsConfigs.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        entityState: { ...item.entityState, ...wineAppConfig.entityState },
      };
    }
    return item;
  });

  return { ...state, wineAppsConfigs: patchedWineAppsConfigs };
};
