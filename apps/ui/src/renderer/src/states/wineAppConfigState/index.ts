import { WineAppConfigActionType as ActionType } from '@constants/actionTypes';
import { WineAppConfigAction } from '@interfaces/WineAppConfigAction';
import { WineAppConfigState } from '@interfaces/WineAppConfigState';
import { patch } from './handlers';

const initialState: WineAppConfigState = {
  wineAppsConfigs: []
};

export const wineAppConfigState = (state = initialState, action: WineAppConfigAction) => {
  switch (action.type) {
    case ActionType.PATCH:
      return patch(action.wineAppConfig, state);
    default:
      return state;
  }
};
