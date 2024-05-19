import { WineInstalledAppActionType as ActionType } from '@constants';
import { WineInstalledAppState } from '@interfaces';

export type WineInstalledAppAction = {
  type: ActionType.LIST_ALL;
  wineInstalledApps: WineInstalledAppState['wineInstalledApps'];
};
