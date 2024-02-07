import { WineAppConfigActionType as ActionType } from '@constants';
import { WineAppConfigState } from '@interfaces';

export type WineAppConfigAction =
  | {
      type: ActionType.LIST_ALL;
      wineAppsConfigs: WineAppConfigState['wineAppsConfigs'];
    }
  | {
      type: ActionType.PATCH;
      id: string | undefined;
      wineAppConfig: WineAppConfigState['wineAppsConfigs'][0];
    };
