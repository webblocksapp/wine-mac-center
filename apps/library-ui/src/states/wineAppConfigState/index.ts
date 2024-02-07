import { WineAppConfigActionType as ActionType } from '@constants';
import { WineAppConfigAction, WineAppConfigState } from '@interfaces';
import { listAll, patch } from './handlers';

const initialState: WineAppConfigState = {
  wineAppsConfigs: [],
};

export const wineAppConfigState = (
  state = initialState,
  action: WineAppConfigAction
) => {
  switch (action.type) {
    case ActionType.LIST_ALL:
      return listAll(action.wineAppsConfigs, state);
    case ActionType.PATCH:
      return patch(action.id, action.wineAppConfig, state);
    default:
      return state;
  }
};
