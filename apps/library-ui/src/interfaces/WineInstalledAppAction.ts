import { WineInstalledAppActionType as ActionType } from '@constants';
import { Flatten, WineInstalledAppState } from '@interfaces';

export type WineInstalledAppAction =
  | {
      type: ActionType.LIST_ALL;
      wineInstalledApps: WineInstalledAppState['wineInstalledApps'];
    }
  | {
      type: ActionType.PATCH;
      appId: string;
      wineInstalledApp: Partial<
        Flatten<WineInstalledAppState['wineInstalledApps']>
      >;
    };
