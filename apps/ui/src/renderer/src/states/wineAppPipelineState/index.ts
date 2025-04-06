import { WineAppPipelineActionType } from '@constants/actionTypes';
import { WineAppPipelineAction } from '@interfaces/WineAppPipelineAction';
import { WineAppPipelineState } from '@interfaces/WineAppPipelineState';
import { patch, remove } from './handlers';

const initialState: WineAppPipelineState = {
  pipelineStatus: undefined
};

export const wineAppPipelineState = (
  state: WineAppPipelineState = initialState,
  action: WineAppPipelineAction
) => {
  switch (action.type) {
    case WineAppPipelineActionType.PATCH:
      return patch(action.pipelineStatus, state);
    case WineAppPipelineActionType.REMOVE:
      return remove(state);
    default:
      return state;
  }
};
