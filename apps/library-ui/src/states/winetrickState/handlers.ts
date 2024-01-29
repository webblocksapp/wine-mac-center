import { WinetrickState } from '@interfaces';

export const listAll = (
  winetricks: Partial<WinetrickState['winetricks']>,
  state: WinetrickState
): WinetrickState => {
  return { ...state, winetricks: { ...state.winetricks, ...winetricks } };
};

export const loaders = (
  loaders: Partial<WinetrickState['loaders']>,
  state: WinetrickState
): WinetrickState => {
  return {
    ...state,
    loaders: { ...state.loaders, ...loaders },
  };
};
