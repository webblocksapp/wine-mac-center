import { WinetrickActionType } from '@constants';
import { WinetrickAction, WinetrickState } from '@interfaces';
import { listAll, loaders } from './handlers';

const initialState: WinetrickState = {
  winetricks: {
    apps: [],
    benchmarks: [],
    dlls: [],
    fonts: [],
    games: [],
    settings: [],
  },
  loaders: {
    listingAll: false,
  },
};

export const winetrickState = (
  state: WinetrickState = initialState,
  action: WinetrickAction,
) => {
  switch (action.type) {
    case WinetrickActionType.LIST:
      return listAll(action.winetricks, state);
    case WinetrickActionType.LOADING:
      return loaders(action.loaders, state);
    default:
      return state;
  }
};
