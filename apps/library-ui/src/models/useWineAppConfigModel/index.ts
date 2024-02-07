import { useState } from 'react';
import { useWineAppConfigApiClient } from '@api-clients';
import { WineAppConfigActionType as ActionType } from '@constants';
import {
  RootState,
  WineAppConfigAction,
  WineAppConfigState,
} from '@interfaces';
import { useAppModel } from '@models';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { store } from '@store';
import { buildAppUrls } from '@utils';
import { useDispatch } from 'react-redux';

export const useWineAppConfigModel = () => {
  const [state, setState] = useState({
    loaders: { listingAll: false, reading: false },
  });
  const appModel = useAppModel();
  const wineAppConfigApiClient = useWineAppConfigApiClient();
  const dispatch = useDispatch<Dispatch<WineAppConfigAction>>();

  const listAll = async () => {
    try {
      dispatchLoader({ listingAll: true });
      dispatch({
        type: ActionType.LIST_ALL,
        wineAppsConfigs: await wineAppConfigApiClient.listAll(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingAll: false });
    }
  };

  const read = async (id?: string) => {
    try {
      const wineAppConfig = selectWineAppConfig(store.getState(), id);
      dispatchLoader({ reading: true });

      if (wineAppConfig.scriptUrl === undefined) {
        throw new Error('Unable to download installation script');
      }

      dispatch({
        type: ActionType.PATCH,
        id,
        wineAppConfig: await wineAppConfigApiClient.read(
          wineAppConfig.scriptUrl
        ),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ reading: false });
    }
  };

  const dispatchLoader = (loaders: Partial<(typeof state)['loaders']>) => {
    setState((prev) => ({ ...prev, loaders: { ...prev.loaders, ...loaders } }));
  };

  const selectWineAppConfigState = (state: RootState) =>
    state.wineAppConfigState;
  const selectWineAppsConfigs = createSelector(
    [selectWineAppConfigState],
    (wineAppConfigState) => wineAppConfigState.wineAppsConfigs
  );
  const selectWineAppConfig = createSelector(
    [selectWineAppsConfigs, (_: RootState, id?: string) => id],
    (wineAppConfigs, id): WineAppConfigState['wineAppsConfigs'][0] => {
      const config = wineAppConfigs.find((item) => item.id == id);
      return { ...config, ...buildAppUrls(config) };
    }
  );

  return {
    loaders: state.loaders,
    listAll,
    read,
    selectWineAppConfigState,
    selectWineAppsConfigs,
    selectWineAppConfig,
  };
};
