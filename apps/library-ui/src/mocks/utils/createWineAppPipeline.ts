import { createWineAppPipeline as baseCreateWineAppPipeline } from 'neu-wine-api';

export const createWineAppPipeline: typeof baseCreateWineAppPipeline = (
  options
) => {
  const { ...rest } = baseCreateWineAppPipeline(options);
  return { ...rest };
};
