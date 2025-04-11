import { WINE_APPS_ENGINES_URL } from '@constants/urls';
import { axiosWineEngines } from '@utils/axiosWineEngines';
import { v4 as uuid } from 'uuid';

import { createWineEngineApiClient } from '@api-clients/createWineEngineApiClient';

export const useWineEngineApiClient = () => {
  const { list } = createWineEngineApiClient();

  const listDownloadables = async () => {
    const { data } = await axiosWineEngines.get<{
      engines: Array<{
        version: string;
        parts: string[];
      }>;
    }>(`/index.json?nocache=${uuid()}`);

    return data.engines.map((item) => ({
      ...item,
      urls: item.parts.map((part) => `${WINE_APPS_ENGINES_URL}/${item.version}/${part}`)
    }));
  };

  return {
    list,
    listDownloadables
  };
};
