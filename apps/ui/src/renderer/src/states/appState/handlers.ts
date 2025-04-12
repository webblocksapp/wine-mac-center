import { AppState } from '@interfaces/AppState';

export const handleMessages = (
  messages: Partial<AppState['messages']>,
  state: AppState
): AppState => {
  return {
    ...state,
    messages: { ...state.messages, ...messages }
  };
};
