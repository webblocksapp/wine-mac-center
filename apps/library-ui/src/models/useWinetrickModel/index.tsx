import { useWinetrickApiClient } from 'neu-wine-api';
import { useDispatch } from 'react-redux';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { WinetrickActionType as ActionType } from '@constants';
import { RootState, WinetrickAction, WinetrickState } from '@interfaces';
import { useAppModel } from '@models';

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

  const dispatchWinetricks = (
    winetricks: Partial<WinetrickState['winetricks']>
  ) => {
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
    selectWinetricks,
  };
};
