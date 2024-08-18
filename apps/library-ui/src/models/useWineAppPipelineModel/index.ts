import {
  RootState,
  WineAppConfig,
  WineAppPipelineAction,
  WineAppPipelineStatus,
} from '@interfaces';
import { useWineAppPipeline } from '@hocs';
import { useDispatch } from 'react-redux';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { WineAppPipelineActionType as ActionType } from '@constants';
import { store } from '@store';
import {
  useAppModel,
  useWineAppConfigModel,
  useWineAppModel,
  useWineEngineModel,
} from '@models';

export const useWineAppPipelineModel = () => {
  const appModel = useAppModel();
  const wineAppModel = useWineAppModel();
  const wineAppConfigModel = useWineAppConfigModel();
  const wineEngineModel = useWineEngineModel();
  const { createWineAppPipeline, ...context } = useWineAppPipeline();
  const dispatch = useDispatch<Dispatch<WineAppPipelineAction>>();

  const runWineAppPipelineByAppConfigId = async (appConfigId?: string) => {
    try {
      const wineApp = wineAppModel.selectWineApp(store.getState(), appConfigId);
      const wineAppConfig = wineAppConfigModel.selectWineAppConfig(
        store.getState(),
        appConfigId,
      );

      if (wineApp === undefined || wineAppConfig === undefined) {
        throw Error('Wine application config not found.');
      }

      await runWineAppPipeline({
        ...wineAppConfig,
        id: wineAppConfig.id,
        name: wineApp.name,
        iconURL: wineApp.iconURL,
      });
    } catch (error) {
      appModel.dispatchError(error);
    }
  };

  const runWineAppPipeline = async (
    appConfig: Omit<WineAppConfig, 'engineURLs'> & {
      engineURLs?: string[];
      name: string;
    },
  ) => {
    try {
      let config = {
        ...appConfig,
        engineURLs: [...(appConfig.engineURLs || [])],
      };

      if (!config.engineURLs.length) {
        config = {
          ...appConfig,
          engineURLs: wineEngineModel.findEngineURLs(appConfig.engineVersion),
        };
      }

      const iconFile = config.iconFile;

      const pipeline = await createWineAppPipeline({
        appConfig: { ...config, iconFile },
        debug: true,
        outputEveryMs: 1000,
      });

      dispatchPatch({
        ...pipeline.getInitialStatus(),
        appConfigId: appConfig.id,
      });

      pipeline.onUpdate((pipelineStatus) => {
        dispatchPatch({ ...pipelineStatus, appConfigId: appConfig.id });
      });
      pipeline.run();
    } catch (error) {
      appModel.dispatchError(error);
    }
  };

  const killWineAppPipeline = (id: string | undefined) =>
    context.killWineAppPipeline(id);

  const clearWineAppPipeline = () => {
    dispatch({
      type: ActionType.REMOVE,
    });
  };

  const dispatchPatch = (pipelineStatus: WineAppPipelineStatus) => {
    dispatch({
      type: ActionType.PATCH,
      pipelineStatus,
    });
  };

  const selectWineAppPipelineState = (state: RootState) =>
    state.wineAppPipelineState;
  const selectWineAppPipelineStatus = createSelector(
    [selectWineAppPipelineState],
    (wineAppPipelineState) => wineAppPipelineState.pipelineStatus,
  );
  const selectWineAppPipelineMeta = createSelector(
    [selectWineAppPipelineStatus],
    (wineAppPipeline) => {
      return {
        wineApp: wineAppModel.selectWineApp(
          store.getState(),
          wineAppPipeline?.appConfigId,
        ),
        wineAppConfig: wineAppConfigModel.selectWineAppConfig(
          store.getState(),
          wineAppPipeline?.appConfigId,
        ),
      };
    },
  );
  const selectWineAppPipelineWithMeta = createSelector(
    [selectWineAppPipelineStatus, selectWineAppPipelineMeta],
    (wineAppsPipeline, meta) => ({ ...wineAppsPipeline, meta }),
  );

  return {
    runWineAppPipeline,
    runWineAppPipelineByAppConfigId,
    killWineAppPipeline,
    clearWineAppPipeline,
    dispatchPatch,
    selectWineAppPipelineStatus,
    selectWineAppPipelineMeta,
    selectWineAppPipelineWithMeta,
  };
};
