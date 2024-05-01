import { parseJSON, useEnv } from '@utils';
import { filesystem } from '@neutralinojs/lib';
import { WineAppConfig, fileExists } from 'neu-wine-api';
import { WINE_APP_CONFIG_JSON_PATH } from '@constants';

export const useWineInstalledAppApiClient = () => {
  const env = useEnv();
  const WINE_APPS_PATH = env.get().WINE_APPS_PATH;

  const listAll = async () => {
    const entries = await filesystem.readDirectory(WINE_APPS_PATH);
    const directories = entries.filter((item) => item.type === 'DIRECTORY');
    let promises: Array<Promise<string | undefined>> = [];
    let configs: Array<WineAppConfig> = [];

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
      .filter((item) => item !== undefined) as WineAppConfig[];

    return configs;
  };

  return {
    listAll,
  };
};
