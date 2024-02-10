import { WineAppPipelineActionType as ActionType } from '@constants';
import { Flatten, WineAppPipelineState } from '@interfaces';

export type WineAppPipelineAction = {
  type: ActionType.PATCH;
  pipelineStatus: Flatten<WineAppPipelineState['pipelines']>;
};
