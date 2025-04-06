import { WineAppPipelineActionType as ActionType } from '@constants/actionTypes';
import { Flatten } from '@interfaces/Flatten';
import { WineAppPipelineState } from '@interfaces/WineAppPipelineState';

export type WineAppPipelineAction =
  | {
      type: ActionType.PATCH;
      pipelineStatus: Flatten<WineAppPipelineState['pipelineStatus']>;
    }
  | {
      type: ActionType.REMOVE;
    };
