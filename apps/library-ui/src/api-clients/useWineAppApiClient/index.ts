import { WineApp } from '@interfaces';
import { axiosWineAppsConfigs, buildAppUrls } from '@utils';
import { v4 as uuid } from 'uuid';

export const useWineAppApiClient = () => {
  const listAll = async () => {
    const { data } = await axiosWineAppsConfigs.get<WineApp[]>(
      `/index.json?nocache=${uuid()}`
    );
    return data.map((item) => ({ ...item, ...buildAppUrls(item) }));
  };

  return {
    listAll,
  };
};
