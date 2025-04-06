import { Winetrick } from '@interfaces/Winetrick';

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
