import { WineAppConfigActionType as ActionType } from '@constants/actionTypes';
import { Flatten } from '@interfaces/Flatten';
import { WineAppConfigState } from '@interfaces/WineAppConfigState';

export type WineAppConfigAction = {
  type: ActionType.PATCH;
  wineAppConfig: Flatten<WineAppConfigState['wineAppsConfigs']>;
};
