import { AppAction, AppState } from '@interfaces';
import { AppActionType as ActionType } from '@constants';
import { handleMessages } from './handlers';

const initialState: AppState = {
  messages: { error: '', success: '', info: '' },
};

export const appState = (state: AppState = initialState, action: AppAction) => {
  switch (action.type) {
    case ActionType.SHOW_MESSAGE:
      return handleMessages(action.messages, state);
    default:
      return state;
  }
};
