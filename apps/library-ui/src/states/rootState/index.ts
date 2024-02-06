import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { appState } from '../appState';
import { wineAppConfigState } from '../wineAppConfigState';
import { winetrickState } from '../winetrickState';
import { wineEngineState } from '../wineEngineState';

export const rootState = combineStates({
  appState,
  wineAppConfigState,
  winetrickState,
  wineEngineState,
});
