import { WineAppConfig } from '@interfaces';
import { axiosWineAppsConfigs } from '@utils';

export const useWineAppConfigApiClient = () => {
  const listAll = async () => {
    const { data } = await axiosWineAppsConfigs.get<WineAppConfig[]>(
      '/index.json'
    );
    return data;
  };

  return {
    listAll,
  };
};
