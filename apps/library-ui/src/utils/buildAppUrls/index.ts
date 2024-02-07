import { WINE_APPS_CONFIGS_URL } from '@constants';
import { WineApp } from '@interfaces';
import { encodeURL } from '@utils';

export const buildAppUrls = (appConfig?: WineApp) => {
  const URL = `${WINE_APPS_CONFIGS_URL}/${appConfig?.keyName || ''}`;
  const ASSETS_URL = `${URL}/assets`;
  return {
    imgSrc: encodeURL(`${ASSETS_URL}/header.jpeg`),
    scriptUrl: encodeURL(
      `${URL}/versions/${appConfig?.version || ''}/index.json`
    ),
  };
};
