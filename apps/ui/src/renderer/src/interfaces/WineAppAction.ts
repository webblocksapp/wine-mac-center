import { WineAppActionType as ActionType } from '@constants';
import { WineAppState } from '@interfaces';

export type WineAppAction = {
  type: ActionType.LIST_ALL;
  wineApps: WineAppState['wineApps'];
};
