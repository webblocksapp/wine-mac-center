import { WINE_APPS_CONFIGS_URL } from '@constants';
import { WineAppConfig } from '@interfaces';
import { encodeURL } from '@utils';

export const buildAppUrls = (appConfig?: WineAppConfig) => {
  const URL = `${WINE_APPS_CONFIGS_URL}/${appConfig?.id || ''}`;
  const ASSETS_URL = `${URL}/assets`;
  return {
    imgSrc: encodeURL(`${ASSETS_URL}/header.jpeg`),
    scriptUrl: encodeURL(
      `${URL}/versions/${appConfig?.version || ''}/index.json`
    ),
  };
};
