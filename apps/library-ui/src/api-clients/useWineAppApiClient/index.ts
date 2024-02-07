import { WineApp } from '@interfaces';
import { axiosWineAppsConfigs, buildAppUrls } from '@utils';

export const useWineAppApiClient = () => {
  const listAll = async () => {
    const { data } = await axiosWineAppsConfigs.get<WineApp[]>('/index.json');
    return data.map((item) => ({ ...item, ...buildAppUrls(item) }));
  };

  return {
    listAll,
  };
};
