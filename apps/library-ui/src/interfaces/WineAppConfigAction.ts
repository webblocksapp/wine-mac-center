import { WineAppConfigActionType as ActionType } from '@constants';
import { WineAppConfigState } from '@interfaces';

export type WineAppConfigAction = {
  type: ActionType.PATCH;
  wineAppConfig: WineAppConfigState['wineAppsConfigs'][0];
};
