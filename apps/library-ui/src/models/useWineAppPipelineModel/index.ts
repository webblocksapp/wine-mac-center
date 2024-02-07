import { WineAppPipelineAction } from '@interfaces';
import { useWineAppPipeline } from '@components';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
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
        appId
      );

      if (wineApp === undefined || wineAppConfig === undefined)
        throw Error('Wine application config not found.');

      const pipeline = await createWineAppPipeline({
        ...wineAppConfig,
        name: wineApp.name,
      });
      pipeline.onUpdate((jobs) => {
        console.log(jobs);
        dispatch({
          type: ActionType.PATCH,
          pipeline: { id: pipeline.id, jobs },
        });
        pipeline;
      });
      pipeline.run();
    } catch (error) {
      appModel.dispatchError(error);
    }
  };

  return {
    runWineAppPipeline,
  };
};
