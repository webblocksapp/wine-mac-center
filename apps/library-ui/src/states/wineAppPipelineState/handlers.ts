import { Flatten, WineAppPipelineState } from '@interfaces';

export const patch = (
  pipelineStatus: Exclude<
    Flatten<WineAppPipelineState['pipelines']>,
    undefined
  >,
  state: WineAppPipelineState,
): WineAppPipelineState => {
  if (
    state?.pipelines?.some(
      (item) => item.pipelineId == pipelineStatus.pipelineId,
    )
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
      pipelines: [...(state?.pipelines || []), pipelineStatus],
    };
  }
};

export const remove = (
  id: string | undefined,
  state: WineAppPipelineState,
): WineAppPipelineState => ({
  ...state,
  pipelines: [
    ...(state?.pipelines || []).filter((item) => item.pipelineId !== id),
  ],
});
