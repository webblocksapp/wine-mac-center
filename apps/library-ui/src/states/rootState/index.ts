import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { winetrickState } from '../winetrickState';
import { wineEngineState } from '../wineEngineState';

export const rootState = combineStates({ winetrickState, wineEngineState });
