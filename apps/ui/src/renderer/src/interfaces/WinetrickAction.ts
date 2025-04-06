import { WinetrickActionType as ActionType } from '@constants/actionTypes';
import { WinetrickState } from '@interfaces/WinetrickState';

export type WinetrickAction =
  | {
      type: ActionType.LIST;
      winetricks: Partial<WinetrickState['winetricks']>;
    }
  | { type: ActionType.LOADING; loaders: Partial<WinetrickState['loaders']> };
