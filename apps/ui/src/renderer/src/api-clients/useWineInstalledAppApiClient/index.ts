import { WINE_APP_CONFIG_JSON_PATH } from '@constants/paths';
import { WineAppConfig } from '@interfaces/WineAppConfig';
import { WineInstalledApp } from '@interfaces/WineInstalledApp';
import { fileExists } from '@utils/fileExists';
import { parseJson } from '@utils/parseJson';
import { readDirectory } from '@utils/readDirectory';
import { useEnv } from '@utils/useEnv';
import { readFileAsString } from '@utils/readFileAsString';
import { spawnProcess } from '@utils/spawnProcess';

export const useWineInstalledAppApiClient = () => {
  const env = useEnv();
  const WINE_APPS_PATH = env.get().WINE_APPS_PATH;

  const listAll = async () => {
    const directories = await readDirectory(WINE_APPS_PATH);
    const promises: Array<Promise<{ appPath: string; config: string } | undefined>> = [];
    let configs: Array<WineInstalledApp> = [];

    for (const dir of directories) {
      const APP_PATH = `${WINE_APPS_PATH}/${dir}`;
      const CONFIG_FILE = `${APP_PATH}/${WINE_APP_CONFIG_JSON_PATH}`;
      const promise = new Promise<{ appPath: string; config: string } | undefined>(
        async (resolve) => {
          if (await fileExists(CONFIG_FILE)) {
            const config = await readFileAsString(CONFIG_FILE);
            resolve({ appPath: APP_PATH, config });
          } else {
            resolve(undefined);
          }
        }
      );
      promises.push(promise);
    }

    configs = (await Promise.all(promises))
      .filter((item) => item !== undefined)
      .map((item) => ({
        ...item,
        config: parseJson<WineAppConfig>(item?.config)
      }))
      .map((item) => ({
        ...item.config,
        configId: item.config?.id,
        id: item.config?.appId,
        appPath: item.appPath
      })) as WineInstalledApp[];

    return configs;
  };

  const runApp = (appPath: string) => {
    return spawnProcess(`open "${appPath}"`);
  };

  const killApp = (pid: number) => {
    return spawnProcess(`kill ${pid}`);
  };

  return {
    listAll,
    runApp,
    killApp
  };
};
