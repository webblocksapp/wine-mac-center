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

  const runApp = async (appId?: string) => {
    try {
      const wineInstalledApp = selectWineInstalledApp(store.getState(), appId);

      if (wineInstalledApp === undefined) {
        throw new Error('No installed app found.');
      }

      const process = await wineInstalledAppApiClient.runApp(
        wineInstalledApp.appPath,
      );

      dispatchPatch(wineInstalledApp.id, { pid: process.pid });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingAll: false });
    }
  };

  const killApp = async (appId?: string) => {
    try {
      const wineInstalledApp = selectWineInstalledApp(store.getState(), appId);

      if (wineInstalledApp === undefined) {
        throw new Error('No installed app found.');
      }

      if (wineInstalledApp.pid === undefined) {
        throw new Error('No app running.');
      }

      await wineInstalledAppApiClient.killApp(wineInstalledApp.pid);

      dispatchPatch(wineInstalledApp.id, { pid: undefined });
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
  const dispatchPatch = (
    appId: string,
    wineInstalledApp: Partial<WineInstalledApp>,
  ) => {
    dispatch({
      type: ActionType.PATCH,
      appId,
      wineInstalledApp,
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
    (wineInstalledApps, id) => wineInstalledApps?.find((item) => item.id == id),
  );

  return {
    loaders: state.loaders,
    listAll,
    dispatchListAll,
    runApp,
    killApp,
    selectWineInstalledAppState,
    selectWineInstalledApps,
    selectWineInstalledApp,
  };
};
