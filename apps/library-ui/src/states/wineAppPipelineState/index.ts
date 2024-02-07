import { WineAppPipelineActionType } from '@constants';
import { WineAppPipelineAction, WineAppPipelineState } from '@interfaces';
import { patch } from './handlers';

const initialState: WineAppPipelineState = {
  pipelines: [],
};

export const wineAppPipelineState = (
  state: WineAppPipelineState = initialState,
  action: WineAppPipelineAction
) => {
  switch (action.type) {
    case WineAppPipelineActionType.PATCH:
      return patch(action.pipelineStatus, state);
    default:
      return state;
  }
};
