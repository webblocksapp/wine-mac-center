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
    listingApps: boolean;
    listingBenchmarks: boolean;
    listingDlls: boolean;
    listingFonts: boolean;
    listingGames: boolean;
    listingSettings: boolean;
    listingAll: boolean;
  };
};
