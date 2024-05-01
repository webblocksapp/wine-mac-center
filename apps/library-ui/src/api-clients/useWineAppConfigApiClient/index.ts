import { WineAppConfig } from 'neu-wine-api';
import { useWineEngineApiClient } from '@api-clients';
import { axiosWineAppsConfigs } from '@utils';
import { DOWNLOADABLES_URLS } from '@constants';
import { v4 as uuid } from 'uuid';

export const useWineAppConfigApiClient = () => {
  const wineEngineApiClient = useWineEngineApiClient();

  const mapResponse = async (data: WineAppConfig): Promise<WineAppConfig> => {
    return {
      ...data,
      engineURLs: await wineEngineApiClient.readEngineURLs(data.engineVersion),
      setupExecutableURLs: data?.setupExecutableURLs?.map?.((url) => {
        if (DOWNLOADABLES_URLS[url]) {
          return DOWNLOADABLES_URLS[url];
        }

        return url;
      }),
    };
  };

  const read = async (scriptUrl: string) => {
    const { data } = await axiosWineAppsConfigs.get<WineAppConfig>(
      `${scriptUrl}?nocache=${uuid()}`,
    );
    return mapResponse(data);
  };

  return {
    read,
  };
};
