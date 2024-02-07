import { WineAppPipelineAction } from '@interfaces';
import { useWineAppPipeline } from '@components';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { WineAppPipelineActionType as ActionType } from '@constants';
import { store } from '@store';
import { useAppModel, useWineAppConfigModel } from '@models';

export const useWineAppPipelineModel = () => {
  const appModel = useAppModel();
  const wineAppConfigModel = useWineAppConfigModel();
  const { createWineAppPipeline } = useWineAppPipeline();
  const dispatch = useDispatch<Dispatch<WineAppPipelineAction>>();

  const runWineAppPipeline = async (appId?: string) => {
    try {
      const appConfig = wineAppConfigModel.selectWineAppConfig(
        store.getState(),
        appId
      );

      if (appConfig === undefined)
        throw Error('Wine application config not found.');

      const pipeline = await createWineAppPipeline(appConfig);
      pipeline.onUpdate((jobs) => {
        dispatch({
          type: ActionType.PATCH,
          pipeline: { id: pipeline.id, jobs },
        });
        pipeline;
      });
    } catch (error) {
      appModel.dispatchError(error);
    }
  };

  return {
    runWineAppPipeline,
  };
};
