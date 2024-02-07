import { WineAppPipelineState } from '@interfaces';

export const patch = (
  pipelineStatus: WineAppPipelineState['pipelines'][0],
  state: WineAppPipelineState
): WineAppPipelineState => {
  if (
    state.pipelines.some((item) => item.pipelineId == pipelineStatus.pipelineId)
  ) {
    return {
      ...state,
      pipelines: state.pipelines.map((item) => {
        if (item.pipelineId === pipelineStatus.pipelineId) {
          return { ...item, ...pipelineStatus };
        }
        return item;
      }),
    };
  } else {
    return {
      ...state,
      pipelines: [...state.pipelines, pipelineStatus],
    };
  }
};
