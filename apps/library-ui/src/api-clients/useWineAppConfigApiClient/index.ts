import { WineAppConfig } from 'neu-wine-api';
import { axiosWineAppsConfigs } from '@utils';
import { v4 as uuid } from 'uuid';

export const useWineAppConfigApiClient = () => {
  const read = async (scriptUrl: string) => {
    const { data } = await axiosWineAppsConfigs.get<WineAppConfig>(
      `${scriptUrl}?nocache=${uuid()}`
    );
    return data;
  };

  return {
    read,
  };
};
