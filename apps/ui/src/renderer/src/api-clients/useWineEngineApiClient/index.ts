import { useWineEngineApiClient as useBaseWineEngineApiClient } from 'neu-wine-api';
import { WINE_APPS_ENGINES_URL } from '@constants';
import { axiosWineEngines } from '@utils';
import { v4 as uuid } from 'uuid';

export const useWineEngineApiClient = () => {
  const baseBaseWineEngineApiClient = useBaseWineEngineApiClient();

  const listDownloadables = async () => {
    const { data } = await axiosWineEngines.get<{
      engines: Array<{
        version: string;
        parts: string[];
      }>;
    }>(`/index.json?nocache=${uuid()}`);

    return data.engines.map((item) => ({
      ...item,
      urls: item.parts.map(
        (part) => `${WINE_APPS_ENGINES_URL}/${item.version}/${part}`,
      ),
    }));
  };

  return {
    ...baseBaseWineEngineApiClient,
    listDownloadables,
  };
};
