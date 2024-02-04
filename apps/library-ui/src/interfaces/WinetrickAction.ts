import { WinetrickActionType as ActionType } from '@constants';
import { WinetrickState } from '@interfaces';

export type WinetrickAction =
  | {
      type: ActionType.LIST;
      winetricks: Partial<WinetrickState['winetricks']>;
    }
  | { type: ActionType.LOADING; loaders: Partial<WinetrickState['loaders']> };
