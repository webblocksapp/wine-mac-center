import { WineAppPipelineState } from '@interfaces';

export const patch = (
  pipelineStatus: WineAppPipelineState['pipelineStatus'],
  state: WineAppPipelineState,
): WineAppPipelineState => {
  return {
    ...state,
    pipelineStatus: {
      ...state.pipelineStatus,
      ...pipelineStatus,
    } as WineAppPipelineState['pipelineStatus'],
  };
};

export const remove = (state: WineAppPipelineState): WineAppPipelineState => ({
  ...state,
  pipelineStatus: undefined,
});
