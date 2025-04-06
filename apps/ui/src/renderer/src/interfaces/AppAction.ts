import { AppActionType as ActionType } from '@constants';

export type AppAction = {
  type: ActionType.SHOW_MESSAGE;
  messages: { error?: string; success?: string; info?: string };
};
