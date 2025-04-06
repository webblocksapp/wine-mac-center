import { WineInstalledAppActionType as ActionType } from '@constants/actionTypes';
import { WineInstalledAppAction } from '@interfaces/WineInstalledAppAction';
import { WineInstalledAppState } from '@interfaces/WineInstalledAppState';
import { listAll, patch } from './handlers';

const initialState: WineInstalledAppState = {
  wineInstalledApps: []
};

export const wineInstalledAppState = (state = initialState, action: WineInstalledAppAction) => {
  switch (action.type) {
    case ActionType.LIST_ALL:
      return listAll(action.wineInstalledApps, state);
    case ActionType.PATCH:
      return patch(action.appId, action.wineInstalledApp, state);
    default:
      return state;
  }
};
