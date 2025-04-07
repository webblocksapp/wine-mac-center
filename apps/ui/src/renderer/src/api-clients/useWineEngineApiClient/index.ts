import { WINE_APPS_ENGINES_URL } from '@constants/urls';
import { axiosWineEngines } from '@utils/axiosWineEngines';
import { v4 as uuid } from 'uuid';
import { createEnv } from '@utils/createEnv';
import { readDirectory } from '@utils/readDirectory';

export const useWineEngineApiClient = () => {
  const env = createEnv();

  const list = async () => {
    const engines = await readDirectory(env.get().WINE_ENGINES_PATH);
    return engines
      .filter((item) => item !== '.DS_Store')
      .map((item) => item.replace(/.tar.7z$/, ''));
  };

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
