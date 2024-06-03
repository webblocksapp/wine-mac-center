import { Winetrick } from 'neu-wine-api';

export type WinetrickState = {
  winetricks: {
    apps: Winetrick[];
    benchmarks: Winetrick[];
    dlls: Winetrick[];
    fonts: Winetrick[];
    games: Winetrick[];
    settings: Winetrick[];
  };
  loaders: {
    listingAll: boolean;
  };
};
