import { useDispatch } from 'react-redux';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { WinetrickActionType as ActionType } from '@constants/actionTypes';
import { useWinetrickApiClient } from '@api-clients/useWinetrickApiClient';
import { RootState } from '@interfaces/RootState';
import { WinetrickAction } from '@interfaces/WinetrickAction';
import { WinetrickState } from '@interfaces/WinetrickState';
import { useAppModel } from '@models/useAppModel';

export const useWinetrickModel = () => {
  const appModel = useAppModel();
  const winetrickApiClient = useWinetrickApiClient();
  const dispatch = useDispatch<Dispatch<WinetrickAction>>();

  const listAll = async () => {
    try {
      dispatchLoader({ listingAll: true });
      dispatchWinetricks(await winetrickApiClient.listAll());
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingAll: false });
    }
  };

  const dispatchWinetricks = (winetricks: Partial<WinetrickState['winetricks']>) => {
    dispatch({ type: ActionType.LIST, winetricks });
  };

  const dispatchLoader = (loaders: Partial<WinetrickState['loaders']>) =>
    dispatch({ type: ActionType.LOADING, loaders });

  const selectWinetrickState = (state: RootState) => state.winetrickState;
  const selectWinetricks = createSelector(
    [selectWinetrickState],
    (winetrickState) => winetrickState.winetricks
  );

  return {
    listAll,
    selectWinetrickState,
    selectWinetricks
  };
};
