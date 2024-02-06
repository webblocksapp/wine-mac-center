import { AppState } from '@interfaces';

export const handleMessages = (
  messages: Partial<AppState['messages']>,
  state: AppState
): AppState => {
  return {
    ...state,
    messages: { ...state.messages, ...messages },
  };
};
