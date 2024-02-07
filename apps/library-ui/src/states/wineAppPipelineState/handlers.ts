import { WineAppPipelineState } from '@interfaces';

export const patch = (
  pipeline: WineAppPipelineState['pipelines'][0],
  state: WineAppPipelineState
): WineAppPipelineState => {
  if (state.pipelines.some((item) => item.id == pipeline.id)) {
    return {
      ...state,
      pipelines: state.pipelines.map((item) => {
        if (item.id === pipeline.id) {
          return { ...item, ...pipeline };
        }
        return item;
      }),
    };
  } else {
    return {
      ...state,
      pipelines: [...state.pipelines, pipeline],
    };
  }
};
