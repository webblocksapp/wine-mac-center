import { WINE_APPS_CONFIGS_URL } from '@constants';
import { http, delay, HttpResponse } from 'msw';
import { data } from '../data';

export const wineAppHandler = [
  // List all
  http.get(`${WINE_APPS_CONFIGS_URL}/index.json`, async () => {
    await delay(2000);
    return HttpResponse.json(data.wineApps, { status: 200 });
  }),
];
