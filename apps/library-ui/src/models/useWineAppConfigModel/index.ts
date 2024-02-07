import { useState } from 'react';
import { useWineAppConfigApiClient } from '@api-clients';
import { WineAppConfigActionType as ActionType } from '@constants';
import { RootState, WineAppConfigAction } from '@interfaces';
import { useAppModel, useWineAppModel } from '@models';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { store } from '@store';
import { useDispatch } from 'react-redux';

export const useWineAppConfigModel = () => {
  const [state, setState] = useState({
    loaders: { reading: false },
  });
  const appModel = useAppModel();
  const wineAppModel = useWineAppModel();
  const wineAppConfigApiClient = useWineAppConfigApiClient();
  const dispatch = useDispatch<Dispatch<WineAppConfigAction>>();

  const read = async (appId?: string) => {
    try {
      const wineApp = wineAppModel.selectWineApp(store.getState(), appId);
      dispatchLoader({ reading: true });

      if (wineApp === undefined) {
        throw new Error('Application not found.');
      }

      dispatch({
        type: ActionType.PATCH,
        wineAppConfig: await wineAppConfigApiClient.read(wineApp.scriptUrl),
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
    [selectWineAppsConfigs, (_: RootState, appId?: string) => appId],
    (wineAppConfigs, appId) =>
      wineAppConfigs.find((item) => item.appId == appId)
  );

  return {
    loaders: state.loaders,
    read,
    selectWineAppConfigState,
    selectWineAppsConfigs,
    selectWineAppConfig,
  };
};
