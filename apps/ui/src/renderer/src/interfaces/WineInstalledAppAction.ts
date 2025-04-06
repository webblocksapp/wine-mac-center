import { WineInstalledAppActionType as ActionType } from '@constants/actionTypes';
import { Flatten } from '@interfaces/Flatten';
import { WineInstalledAppState } from '@interfaces/WineInstalledAppState';

export type WineInstalledAppAction =
  | {
      type: ActionType.LIST_ALL;
      wineInstalledApps: WineInstalledAppState['wineInstalledApps'];
    }
  | {
      type: ActionType.PATCH;
      appId: string;
      wineInstalledApp: Partial<Flatten<WineInstalledAppState['wineInstalledApps']>>;
    };
