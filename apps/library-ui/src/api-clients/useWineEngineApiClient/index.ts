import { WINE_APPS_ENGINES_URL } from '@constants';
import { axiosWineEngines } from '@utils';
import { v4 as uuid } from 'uuid';

export const useWineEngineApiClient = () => {
  const readEngineURLs = async (version: string) => {
    const { data } = await axiosWineEngines.get<{ parts: string[] }>(
      `/${version}/index.json?nocache=${uuid()}`,
    );
    return data.parts.map(
      (item) => `${WINE_APPS_ENGINES_URL}/${version}/${item}`,
    );
  };

  return {
    readEngineURLs,
  };
};
