import { useState } from 'react';
import { useWineInstalledAppApiClient } from '@api-clients';
import { WineInstalledAppActionType as ActionType } from '@constants';
import {
  RootState,
  WineInstalledAppAction,
  WineInstalledApp,
} from '@interfaces';
import { useAppModel } from '@models';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { store } from '@store';

export const useWineInstalledAppModel = () => {
  const [state, setState] = useState({
    loaders: { listingAll: false },
  });
  const appModel = useAppModel();
  const wineInstalledAppApiClient = useWineInstalledAppApiClient();
  const dispatch = useDispatch<Dispatch<WineInstalledAppAction>>();

  const listAll = async () => {
    try {
      const wineApps = selectWineInstalledApps(store.getState());
      !wineApps?.length && dispatchLoader({ listingAll: true });
      dispatchListAll(await wineInstalledAppApiClient.listAll());
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingAll: false });
    }
  };

  const dispatchListAll = (wineInstalledApps: WineInstalledApp[]) => {
    dispatch({
      type: ActionType.LIST_ALL,
      wineInstalledApps,
    });
  };
  const dispatchLoader = (loaders: Partial<(typeof state)['loaders']>) => {
    setState((prev) => ({ ...prev, loaders: { ...prev.loaders, ...loaders } }));
  };

  const selectWineInstalledAppState = (state: RootState) =>
    state.wineInstalledAppState;
  const selectWineInstalledApps = createSelector(
    [selectWineInstalledAppState],
    (wineInstalledAppState) => wineInstalledAppState.wineInstalledApps,
  );
  const selectWineInstalledApp = createSelector(
    [selectWineInstalledApps, (_: RootState, id?: string) => id],
    (wineInstalledApps, id) =>
      wineInstalledApps?.find((item) => item.appId == id),
  );

  return {
    loaders: state.loaders,
    listAll,
    dispatchListAll,
    selectWineInstalledAppState,
    selectWineInstalledApps,
    selectWineInstalledApp,
  };
};
