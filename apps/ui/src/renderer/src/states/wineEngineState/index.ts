import { WineEngineActionType } from '@constants/actionTypes';
import { WineEngineAction } from '@interfaces/WineEngineAction';
import { WineEngineState } from '@interfaces/WineEngineState';
import { list, listDownloadables, loaders } from './handlers';

const initialState: WineEngineState = {
  wineEngines: [],
  loaders: { listing: false, listingDownloadables: false }
};

export const wineEngineState = (
  state: WineEngineState = initialState,
  action: WineEngineAction
) => {
  switch (action.type) {
    case WineEngineActionType.LIST:
      return list(action.wineEngines, state);
    case WineEngineActionType.LIST_DOWNLOADABLES:
      return listDownloadables(action.wineEnginesDownloadables, state);
    case WineEngineActionType.LOADING:
      return loaders(action.loaders, state);
    default:
      return state;
  }
};
