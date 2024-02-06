import { AppActionType as ActionType } from '@constants';
import { AppAction, RootState } from '@interfaces';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { handleError } from '@utils';
import { useDispatch } from 'react-redux';

/**
 * Hook for handling global state and configurations of main ui application.
 */
export const useAppModel = () => {
  const dispatch = useDispatch<Dispatch<AppAction>>();

  const dispatchError = (error: unknown) => {
    dispatch({
      type: ActionType.SHOW_MESSAGE,
      messages: { error: handleError(error) },
    });
  };

  const cleanError = () => {
    dispatch({ type: ActionType.SHOW_MESSAGE, messages: { error: '' } });
  };

  const dispatchSuccessMessage = (message: string) => {
    dispatch({ type: ActionType.SHOW_MESSAGE, messages: { success: message } });
  };

  const cleanSuccessMessage = () => {
    dispatch({ type: ActionType.SHOW_MESSAGE, messages: { success: '' } });
  };

  const dispatchInfoMessage = (message: string) => {
    dispatch({ type: ActionType.SHOW_MESSAGE, messages: { info: message } });
  };

  const cleanInfoMessage = () => {
    dispatch({ type: ActionType.SHOW_MESSAGE, messages: { info: '' } });
  };

  const selectAppState = (state: RootState) => state.appState;
  const selectMessages = createSelector(
    [selectAppState],
    (appState) => appState.messages
  );
  const selectError = createSelector(
    [selectMessages],
    (messages) => messages.error
  );
  const selectSuccessMessage = createSelector(
    [selectMessages],
    (messages) => messages.success
  );
  const selectInfoMessage = createSelector(
    [selectMessages],
    (messages) => messages.info
  );

  return {
    dispatchError,
    cleanError,
    dispatchSuccessMessage,
    cleanSuccessMessage,
    dispatchInfoMessage,
    cleanInfoMessage,
    selectAppState,
    selectError,
    selectSuccessMessage,
    selectInfoMessage,
  };
};
