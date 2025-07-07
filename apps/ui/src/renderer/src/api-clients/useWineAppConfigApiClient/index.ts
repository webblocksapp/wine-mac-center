import { DOWNLOADABLES_URLS } from '@constants/urls';
import { WineAppConfig } from '@interfaces/WineAppConfig';
import { axiosWineAppsConfigs } from '@utils/axiosWineAppsConfigs';
import { v4 as uuid } from 'uuid';

export const useWineAppConfigApiClient = () => {
  const mapResponse = (
    data: Omit<WineAppConfig, 'engineURLs'>
  ): Omit<WineAppConfig, 'engineURLs'> => {
    return {
      ...data,
      setupExecutableURL:
        DOWNLOADABLES_URLS[data.setupExecutableURL || ''] || data?.setupExecutableURL
    };
  };

  const read = async (scriptUrl: string) => {
    const { data } = await axiosWineAppsConfigs.get<Omit<WineAppConfig, 'engineURLs'>>(
      `${scriptUrl}?nocache=${uuid()}`
    );
    return mapResponse(data);
  };

  return {
    read
  };
};
