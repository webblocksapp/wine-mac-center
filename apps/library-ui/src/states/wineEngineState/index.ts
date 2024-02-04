import { WineEngineActionType } from '@constants';
import { WineEngineAction, WineEngineState } from '@interfaces';
import { list, loaders } from './handlers';

const initialState: WineEngineState = {
  wineEngines: [],
  loaders: { listing: false },
};

export const wineEngineState = (
  state: WineEngineState = initialState,
  action: WineEngineAction
) => {
  switch (action.type) {
    case WineEngineActionType.LIST:
      return list(action.wineEngines, state);
    case WineEngineActionType.LOADING:
      return loaders(action.loaders, state);
    default:
      return state;
  }
};
