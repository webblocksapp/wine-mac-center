import { WineAppConfigActionType as ActionType } from '@constants';
import { WineAppConfigAction, WineAppConfigState } from '@interfaces';
import { listAll } from './handlers';

const initialState: WineAppConfigState = {
  wineAppsConfigs: [],
  loaders: {
    listingAll: false,
  },
};

export const wineAppConfigState = (
  state = initialState,
  action: WineAppConfigAction
) => {
  switch (action.type) {
    case ActionType.LIST_ALL:
      return listAll(action.wineAppsConfigs, state);
    default:
      return state;
  }
};
