import { AppActionType as ActionType } from '@constants/actionTypes';

export type AppAction = {
  type: ActionType.SHOW_MESSAGE;
  messages: { error?: string; success?: string; info?: string };
};
