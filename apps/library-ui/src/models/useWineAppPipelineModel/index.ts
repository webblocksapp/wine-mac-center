import {
  RootState,
  WineAppPipelineAction,
  WineAppPipelineStatus,
} from '@interfaces';
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
      const wineAppConfig = wineAppConfigModel.selectWineAppConfig(
        store.getState(),
        appId,
      );

      if (wineApp === undefined || wineAppConfig === undefined)
        throw Error('Wine application config not found.');

      //TODO: define automatic executable download.
      const x = {
        ...wineAppConfig,
        setupExecutablePath: '/Users/mauriver/Downloads/SteamSetup.exe',
      };

      const pipeline = await createWineAppPipeline({
        appConfig: { ...x, name: wineApp.name },
        debug: true,
        outputEveryMs: 1000,
      });

      dispatchPatch({
        ...pipeline.getInitialStatus(),
        appId: wineAppConfig.appId,
      });

      pipeline.onUpdate((pipelineStatus) => {
        dispatchPatch({ ...pipelineStatus, appId: wineAppConfig.appId });
      });
      pipeline.run();
    } catch (error) {
      appModel.dispatchError(error);
    }
  };

  const dispatchPatch = (pipelineStatus: WineAppPipelineStatus) => {
    dispatch({
      type: ActionType.PATCH,
      pipelineStatus,
    });
  };

  const selectWineAppPipelineState = (state: RootState) =>
    state.wineAppPipelineState;
  const selectWineAppPipelines = createSelector(
    [selectWineAppPipelineState],
    (wineAppPipelineState) => wineAppPipelineState.pipelines,
  );
  const selectWineAppPipeline = createSelector(
    [selectWineAppPipelines, (_: RootState, id?: string) => id],
    (wineAppPipelines, id) =>
      wineAppPipelines?.find((item) => item.pipelineId == id),
  );
  const selectWineAppPipelineByAppId = createSelector(
    [selectWineAppPipelines, (_: RootState, appId?: string) => appId],
    (wineAppPipelines, appId) =>
      wineAppPipelines?.find((item) => item.appId == appId),
  );
  const selectWineAppPipelineMeta = createSelector(
    [selectWineAppPipeline],
    (wineAppPipeline) => {
      return {
        wineApp: wineAppModel.selectWineApp(
          store.getState(),
          wineAppPipeline?.appId,
        ),
        wineAppConfig: wineAppConfigModel.selectWineAppConfig(
          store.getState(),
          wineAppPipeline?.appId,
        ),
      };
    },
  );
  const selectWineAppPipelineWithMeta = createSelector(
    [selectWineAppPipeline, selectWineAppPipelineMeta],
    (wineAppsPipeline, meta) => ({ ...wineAppsPipeline, meta }),
  );

  return {
    runWineAppPipeline,
    dispatchPatch,
    selectWineAppPipelines,
    selectWineAppPipeline,
    selectWineAppPipelineByAppId,
    selectWineAppPipelineMeta,
    selectWineAppPipelineWithMeta,
  };
};
