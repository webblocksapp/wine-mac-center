import { WineAppActionType as ActionType } from '@constants/actionTypes';
import { WineAppState } from '@interfaces/WineAppState';

export type WineAppAction = {
  type: ActionType.LIST_ALL;
  wineApps: WineAppState['wineApps'];
};
