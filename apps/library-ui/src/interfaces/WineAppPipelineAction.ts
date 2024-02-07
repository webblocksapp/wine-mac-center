import { WineAppPipelineActionType as ActionType } from '@constants';
import { WineAppPipelineState } from '@interfaces';

export type WineAppPipelineAction = {
  type: ActionType.PATCH;
  pipelineStatus: WineAppPipelineState['pipelines'][0];
};
