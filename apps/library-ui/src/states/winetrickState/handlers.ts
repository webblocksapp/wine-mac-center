import { WinetrickState } from '@interfaces';

export const listAll = (
  winetricks: WinetrickState['winetricks'],
  state: WinetrickState
) => {
  return { ...state, winetricks };
};

export const loaders = (
  loaders: Partial<WinetrickState['loaders']>,
  state: WinetrickState
) => {
  return {
    ...state,
    loaders: { ...state.loaders, ...loaders },
  };
};
