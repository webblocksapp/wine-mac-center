import { WineAppConfigActionType as ActionType } from '@constants';
import { Flatten, WineAppConfigState } from '@interfaces';

export type WineAppConfigAction = {
  type: ActionType.PATCH;
  wineAppConfig: Flatten<WineAppConfigState['wineAppsConfigs']>;
};
