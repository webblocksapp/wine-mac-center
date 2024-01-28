import { combineReducers as combineStates } from '@reduxjs/toolkit';
import { winetrickState } from '../winetrickState';

export const rootState = combineStates({ winetrickState });
