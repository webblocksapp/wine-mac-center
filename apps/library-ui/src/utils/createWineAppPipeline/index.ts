import { isDev } from '@utils';
import { createWineAppPipeline as baseCreateWineAppPipeline } from 'neu-wine-api';
import { createWineAppPipeline as mockedCreateWineAppPipeline } from '@mocks/utils';

export const createWineAppPipeline: typeof baseCreateWineAppPipeline = (
  options
) => {
  return isDev()
    ? mockedCreateWineAppPipeline(options)
    : baseCreateWineAppPipeline(options);
};
