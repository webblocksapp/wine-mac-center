import { WineApp } from '@interfaces';
import { buildAppUrls } from '@utils';

export const wineApps: WineApp[] = [
  {
    id: '75a55d4f-6dcc-498a-b74a-f8765c6683e8',
    keyName: 'c&c3',
    name: 'Command & Conquer 3 Tiberium Wars',
    version: 'steam',
  },
  {
    id: 'f339cf36-c576-11ee-935b-685b35922e40',
    keyName: 'steam',
    name: 'Steam',
    version: 'standard',
  },
].map((item) => ({ ...item, ...buildAppUrls(item) }));
