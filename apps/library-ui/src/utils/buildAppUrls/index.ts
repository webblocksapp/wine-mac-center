import { WINE_APPS_CONFIGS_URL } from '@constants';
import { WineAppConfig } from '@interfaces';

export const buildAppUrls = (appConfig?: WineAppConfig) => {
  const URL = `${WINE_APPS_CONFIGS_URL}/${appConfig?.id || ''}`;
  const ASSETS_URL = `${URL}/assets`;
  return {
    imgSrc: `${ASSETS_URL}/header.jpeg`,
    scriptUrl: `${URL}/versions/${appConfig?.version || ''}/index.json`,
  };
};
