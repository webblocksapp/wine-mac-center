import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { appState } from '../appState';
import { wineAppState } from '../wineAppState';
import { wineInstalledAppState } from '../wineInstalledAppState';
import { wineAppConfigState } from '../wineAppConfigState';
import { wineAppPipelineState } from '../wineAppPipelineState';
import { winetrickState } from '../winetrickState';
import { wineEngineState } from '../wineEngineState';

export const rootState = combineStates({
  appState,
  wineAppState,
  wineAppConfigState,
  wineAppPipelineState,
  wineInstalledAppState,
  winetrickState,
  wineEngineState,
});
