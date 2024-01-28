import { WinetrickActionType as ActionType } from '@constants';
import { WinetrickState } from '@interfaces';

export type WinetrickAction =
  | {
      type: ActionType.LIST_ALL;
      winetricks: WinetrickState['winetricks'];
    }
  | { type: ActionType.LOADING; loaders: Partial<WinetrickState['loaders']> };
