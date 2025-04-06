import { useState } from 'react';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { store } from '@store';
import { useDispatch } from 'react-redux';
import { useWineAppConfigApiClient } from '@api-clients/useWineAppConfigApiClient';
import { RootState } from '@interfaces/RootState';
import { WineAppConfigItem } from '@interfaces/WineAppConfigItem';
import { WineAppConfigActionType as ActionType } from '@constants/actionTypes';
import { WineAppConfigAction } from '@interfaces/WineAppConfigAction';
import { useAppModel } from '@models/useAppModel';
import { useWineAppModel } from '@models/useWineAppModel';
import { useWineEngineModel } from '@models/useWineEngineModel';

export const useWineAppConfigModel = () => {
  const [state, setState] = useState({
    loaders: { reading: false }
  });
  const appModel = useAppModel();
  const wineAppModel = useWineAppModel();
  const wineEngineModel = useWineEngineModel();
  const wineAppConfigApiClient = useWineAppConfigApiClient();
  const dispatch = useDispatch<Dispatch<WineAppConfigAction>>();

  const read = async (appId?: string) => {
    try {
      const wineApp = wineAppModel.selectWineApp(store.getState(), appId);
      dispatchLoader({ reading: true });

      if (wineApp === undefined) {
        throw new Error('Application not found.');
      }

      const wineAppConfig = await wineAppConfigApiClient.read(wineApp.scriptUrl);

      const engineURLs = wineEngineModel.findEngineURLs(wineAppConfig.engineVersion);

      dispatchPatch({ ...wineAppConfig, engineURLs });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ reading: false });
    }
  };

  const dispatchPatch = (wineAppConfig: WineAppConfigItem) => {
    dispatch({
      type: ActionType.PATCH,
      wineAppConfig
    });
  };
  const dispatchLoader = (loaders: Partial<(typeof state)['loaders']>) => {
    setState((prev) => ({ ...prev, loaders: { ...prev.loaders, ...loaders } }));
  };

  const selectWineAppConfigState = (state: RootState) => state.wineAppConfigState;
  const selectWineAppsConfigs = createSelector(
    [selectWineAppConfigState],
    (wineAppConfigState) => wineAppConfigState.wineAppsConfigs
  );
  const selectWineAppConfig = createSelector(
    [selectWineAppsConfigs, (_: RootState, appConfigId?: string) => appConfigId],
    (wineAppConfigs, appConfigId) => wineAppConfigs?.find((item) => item.id == appConfigId)
  );

  return {
    loaders: state.loaders,
    read,
    dispatchPatch,
    selectWineAppConfigState,
    selectWineAppsConfigs,
    selectWineAppConfig
  };
};
