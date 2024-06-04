import { WineEngineActionType as ActionType } from '@constants';
import { WineEngineState } from '@interfaces';

export type WineEngineAction =
  | { type: ActionType.LIST; wineEngines: WineEngineState['wineEngines'] }
  | {
      type: ActionType.LIST_DOWNLOADABLES;
      wineEnginesDownloadables: WineEngineState['wineEnginesDownloadables'];
    }
  | { type: ActionType.LOADING; loaders: Partial<WineEngineState['loaders']> };
