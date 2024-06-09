import { WineAppPipelineActionType } from '@constants';
import { WineAppPipelineAction, WineAppPipelineState } from '@interfaces';
import { patch, remove } from './handlers';

const initialState: WineAppPipelineState = {
  pipelineStatus: undefined,
};

export const wineAppPipelineState = (
  state: WineAppPipelineState = initialState,
  action: WineAppPipelineAction,
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
