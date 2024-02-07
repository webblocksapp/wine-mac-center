import { RootState, WineAppPipelineAction } from '@interfaces';
import { useWineAppPipeline } from '@components';
import { useDispatch } from 'react-redux';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { WineAppPipelineActionType as ActionType } from '@constants';
import { store } from '@store';
import { useAppModel, useWineAppConfigModel, useWineAppModel } from '@models';

export const useWineAppPipelineModel = () => {
  const appModel = useAppModel();
  const wineAppModel = useWineAppModel();
  const wineAppConfigModel = useWineAppConfigModel();
  const { createWineAppPipeline } = useWineAppPipeline();
  const dispatch = useDispatch<Dispatch<WineAppPipelineAction>>();

  const runWineAppPipeline = async (appId?: string) => {
    try {
      const wineApp = wineAppModel.selectWineApp(store.getState(), appId);
      let wineAppConfig = wineAppConfigModel.selectWineAppConfig(
        store.getState(),
        appId
      );

      if (wineApp === undefined || wineAppConfig === undefined)
        throw Error('Wine application config not found.');

      //TODO: define automatic executable download.
      wineAppConfig = {
        ...wineAppConfig,
        setupExecutablePath: '/Users/mauriver/Downloads/SteamSetup.exe',
      };

      const pipeline = await createWineAppPipeline({
        appConfig: { ...wineAppConfig, name: wineApp.name },
        debug: true,
        outputEveryMs: 1000,
      });
      pipeline.onUpdate((pipelineStatus) => {
        dispatch({
          type: ActionType.PATCH,
          pipelineStatus,
        });
        pipeline;
      });
      pipeline.run();
    } catch (error) {
      appModel.dispatchError(error);
    }
  };

  const selectWineAppPipelineState = (state: RootState) =>
    state.wineAppPipelineState;
  const selectWineAppPipelines = createSelector(
    [selectWineAppPipelineState],
    (wineAppPipelineState) => wineAppPipelineState.pipelines
  );

  return {
    runWineAppPipeline,
    selectWineAppPipelines,
  };
};
