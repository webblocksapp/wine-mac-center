import { useState } from 'react';
import { WineAppActionType as ActionType } from '@constants/actionTypes';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { store } from '@store';
import { useWineAppApiClient } from '@api-clients/useWineAppApiClient';
import { RootState } from '@interfaces/RootState';
import { SortDirection } from '@interfaces/SortDirection';
import { WineAppAction } from '@interfaces/WineAppAction';
import { useAppModel } from '@models/useAppModel';
import { objectMatchCriteria } from '@utils/objectMatchCriteria';
import { WineAppItem } from '@interfaces/WineAppItem';

export const useWineAppModel = () => {
  const [state, setState] = useState({
    loaders: { listingAll: false }
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

  const dispatchListAll = (wineApps: WineAppItem[]) => {
    dispatch({
      type: ActionType.LIST_ALL,
      wineApps
    });
  };
  const dispatchLoader = (loaders: Partial<(typeof state)['loaders']>) => {
    setState((prev) => ({ ...prev, loaders: { ...prev.loaders, ...loaders } }));
  };

  const selectWineAppState = (state: RootState) => state.wineAppState;
  const selectWineApps = createSelector(
    [
      selectWineAppState,
      (_: RootState, filters?: { criteria?: string; order?: SortDirection }) => filters
    ],
    (wineAppState, filters) => {
      let wineApps = wineAppState.wineApps;
      const { criteria, order } = filters || {};

      if (criteria) {
        wineApps = wineApps?.filter((item) => objectMatchCriteria(item, criteria, ['name']));
      }

      if (order === 'asc' || order === undefined) {
        wineApps = [...(wineApps || [])]?.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (order === 'desc') {
        wineApps = [...(wineApps || [])]?.sort((a, b) => b.name.localeCompare(a.name));
      }

      return wineApps;
    }
  );
  const selectWineApp = createSelector(
    [selectWineAppState, (_: RootState, appConfigId?: string) => appConfigId],
    (wineAppState, appConfigId) =>
      wineAppState.wineApps?.find((item) => item.appConfigId == appConfigId)
  );

  return {
    loaders: state.loaders,
    listAll,
    dispatchListAll,
    selectWineAppState,
    selectWineApps,
    selectWineApp
  };
};
