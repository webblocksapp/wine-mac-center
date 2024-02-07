import { WineAppConfig, WineAppPipelineAction } from '@interfaces';
import { useWineAppPipeline } from '@components';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { WineAppPipelineActionType as ActionType } from '@constants';

export const useWineAppPipelineModel = () => {
  const { createWineAppPipeline } = useWineAppPipeline();
  const dispatch = useDispatch<Dispatch<WineAppPipelineAction>>();

  const runWineAppPipeline = async (appConfig: WineAppConfig) => {
    const pipeline = await createWineAppPipeline(appConfig);

    pipeline.onUpdate((jobs) => {
      dispatch({
        type: ActionType.PATCH,
        pipeline: { id: pipeline.id, jobs },
      });
      pipeline;
    });
  };

  return {
    runWineAppPipeline,
  };
};
