import { WineInstalledAppActionType as ActionType } from '@constants';
import { WineInstalledAppAction, WineInstalledAppState } from '@interfaces';
import { listAll } from './handlers';

const initialState: WineInstalledAppState = {
  wineInstalledApps: [],
};

export const wineInstalledAppState = (
  state = initialState,
  action: WineInstalledAppAction,
) => {
  switch (action.type) {
    case ActionType.LIST_ALL:
      return listAll(action.wineInstalledApps, state);
    default:
      return state;
  }
};
