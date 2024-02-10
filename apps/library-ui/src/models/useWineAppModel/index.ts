import { useState } from 'react';
import { useWineAppApiClient } from '@api-clients';
import { WineAppActionType as ActionType } from '@constants';
import { RootState, WineApp, WineAppAction } from '@interfaces';
import { useAppModel } from '@models';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const useWineAppModel = () => {
  const [state, setState] = useState({
    loaders: { listingAll: false },
  });
  const appModel = useAppModel();
  const wineAppApiClient = useWineAppApiClient();
  const dispatch = useDispatch<Dispatch<WineAppAction>>();

  const listAll = async () => {
    try {
      dispatchLoader({ listingAll: true });
      dispatchListAll(await wineAppApiClient.listAll());
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingAll: false });
    }
  };

  const dispatchListAll = (wineApps: WineApp[]) => {
    dispatch({
      type: ActionType.LIST_ALL,
      wineApps,
    });
  };
  const dispatchLoader = (loaders: Partial<(typeof state)['loaders']>) => {
    setState((prev) => ({ ...prev, loaders: { ...prev.loaders, ...loaders } }));
  };

  const selectWineAppState = (state: RootState) => state.wineAppState;
  const selectWineApps = createSelector(
    [selectWineAppState],
    (wineAppState) => wineAppState.wineApps
  );
  const selectWineApp = createSelector(
    [selectWineApps, (_: RootState, id?: string) => id],
    (wineApps, id) => wineApps.find((item) => item.id == id)
  );

  return {
    loaders: state.loaders,
    listAll,
    dispatchListAll,
    selectWineAppState,
    selectWineApps,
    selectWineApp,
  };
};
