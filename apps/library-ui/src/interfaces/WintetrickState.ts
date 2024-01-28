import { Winetrick } from 'neu-wine-api';

export type WinetrickState = {
  winetricks: Array<Winetrick[]>;
  loaders: {
    listingAll: boolean;
  };
};
