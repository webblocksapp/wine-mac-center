import { parseJSON, useEnv } from '@utils';
import { filesystem } from '@neutralinojs/lib';
import { WineAppConfig, fileExists } from 'neu-wine-api';
import { WINE_APP_CONFIG_JSON_PATH } from '@constants';
import { WineInstalledApp } from '@interfaces';

export const useWineInstalledAppApiClient = () => {
  const env = useEnv();
  const WINE_APPS_PATH = env.get().WINE_APPS_PATH;

  const listAll = async () => {
    const entries = await filesystem.readDirectory(WINE_APPS_PATH);
    const directories = entries.filter((item) => item.type === 'DIRECTORY');
    let promises: Array<Promise<string | undefined>> = [];
    let configs: Array<WineInstalledApp> = [];

    for (const dir of directories) {
      const APP_PATH = `${WINE_APPS_PATH}/${dir.entry}`;
      const CONFIG_FILE = `${APP_PATH}/${WINE_APP_CONFIG_JSON_PATH}`;
      const promise = new Promise<string | undefined>((resolve) => {
        return fileExists(CONFIG_FILE).then((exists) => {
          resolve(exists ? filesystem.readFile(CONFIG_FILE) : undefined);
        });
      });
      promises.push(promise);
    }

    promises = promises.filter((item) => item !== undefined);
    configs = (await Promise.all(promises))
      .map((item) => parseJSON<WineAppConfig>(item))
      .map((item) => ({ ...item, configId: item?.id, id: item?.appId }))
      .filter((item) => item !== undefined) as WineInstalledApp[];

    return configs;
  };

  return {
    listAll,
  };
};
