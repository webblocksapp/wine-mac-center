import { WineAppItem } from '@interfaces/WineAppItem';
import { axiosWineAppsConfigs } from '@utils/axiosWineAppsConfigs';
import { buildAppUrls } from '@utils/buildAppUrls';
import { v4 as uuid } from 'uuid';

export const useWineAppApiClient = () => {
  const listAll = async () => {
    const { data } = await axiosWineAppsConfigs.get<WineAppItem[]>(`/index.json?nocache=${uuid()}`);
    return data.map((item) => ({ ...item, ...buildAppUrls(item) }));
  };

  return {
    listAll
  };
};
