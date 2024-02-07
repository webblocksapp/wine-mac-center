import { useState } from 'react';
import { useWineAppApiClient } from '@api-clients';
import { WineAppActionType as ActionType } from '@constants';
import { RootState, WineAppAction } from '@interfaces';
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
      dispatch({
        type: ActionType.LIST_ALL,
        wineApps: await wineAppApiClient.listAll(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingAll: false });
    }
  };

  const dispatchLoader = (loaders: Partial<(typeof state)['loaders']>) => {
    setState((prev) => ({ ...prev, loaders: { ...prev.loaders, ...loaders } }));
  };

  const selectWineAppState = (state: RootState) => state.wineAppState;
  const selectWineAppsConfigs = createSelector(
    [selectWineAppState],
    (wineAppState) => wineAppState.wineApps
  );
  const selectWineApp = createSelector(
    [selectWineAppsConfigs, (_: RootState, id?: string) => id],
    (wineApps, id) => wineApps.find((item) => item.id == id)
  );

  return {
    loaders: state.loaders,
    listAll,
    selectWineAppState,
    selectWineAppsConfigs,
    selectWineApp,
  };
};
