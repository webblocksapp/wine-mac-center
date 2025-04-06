import { WineAppActionType as ActionType } from '@constants';
import { WineAppAction, WineAppState } from '@interfaces';
import { listAll } from './handlers';

const initialState: WineAppState = {
  wineApps: [],
};

export const wineAppState = (state = initialState, action: WineAppAction) => {
  switch (action.type) {
    case ActionType.LIST_ALL:
      return listAll(action.wineApps, state);
    default:
      return state;
  }
};
