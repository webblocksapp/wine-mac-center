import { useState } from 'react';
import { useWineAppApiClient } from '@api-clients';
import { WineAppActionType as ActionType } from '@constants';
import { RootState, WineApp, WineAppAction } from '@interfaces';
import { useAppModel } from '@models';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { store } from '@store';
import { objectMatchCriteria } from '@utils';

export const useWineAppModel = () => {
  const [state, setState] = useState({
    loaders: { listingAll: false },
  });
  const appModel = useAppModel();
  const wineAppApiClient = useWineAppApiClient();
  const dispatch = useDispatch<Dispatch<WineAppAction>>();

  const listAll = async () => {
    try {
      const wineApps = selectWineApps(store.getState());
      !wineApps?.length && dispatchLoader({ listingAll: true });
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
    [
      selectWineAppState,
      (_: RootState, filters?: { criteria?: string }) => filters,
    ],
    (wineAppState, filters) => {
      let wineApps = wineAppState.wineApps;
      const criteria = filters?.criteria;

      if (criteria) {
        wineApps = wineApps?.filter((item) =>
          objectMatchCriteria(item, criteria, ['name']),
        );
      }

      return wineApps;
    },
  );
  const selectWineApp = createSelector(
    [selectWineApps, (_: RootState, appConfigId?: string) => appConfigId],
    (wineApps, appConfigId) =>
      wineApps?.find((item) => item.appConfigId == appConfigId),
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
