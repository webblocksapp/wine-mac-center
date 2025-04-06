import { WinetrickActionType } from '@constants/actionTypes';
import { WinetrickAction } from '@interfaces/WinetrickAction';
import { WinetrickState } from '@interfaces/WinetrickState';
import { listAll, loaders } from './handlers';

const initialState: WinetrickState = {
  winetricks: {
    apps: [],
    benchmarks: [],
    dlls: [],
    fonts: [],
    games: [],
    settings: []
  },
  loaders: {
    listingAll: false
  }
};

export const winetrickState = (state: WinetrickState = initialState, action: WinetrickAction) => {
  switch (action.type) {
    case WinetrickActionType.LIST:
      return listAll(action.winetricks, state);
    case WinetrickActionType.LOADING:
      return loaders(action.loaders, state);
    default:
      return state;
  }
};
