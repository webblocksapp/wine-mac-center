import { WINE_APPS_CONFIGS_URL } from '@constants';
import { http, delay, HttpResponse } from 'msw';
import { data } from '../data';

export const wineAppConfigHandler = [
  // Read
  http.get(
    `${WINE_APPS_CONFIGS_URL}/:appId/versions/:version/index.json`,
    async ({ params }) => {
      const { appId } = params;
      const config = data.wineAppsConfigs.find((item) => item.appId == appId);

      await delay(2000);
      return HttpResponse.json(config, { status: 200 });
    }
  ),
];
