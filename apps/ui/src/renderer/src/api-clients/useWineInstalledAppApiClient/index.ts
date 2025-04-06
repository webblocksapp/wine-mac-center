import { WINE_APP_CONFIG_JSON_PATH } from '@constants/paths';
import { WineAppConfig } from '@interfaces/WineAppConfig';
import { WineInstalledApp } from '@interfaces/WineInstalledApp';
import { filesystem, os } from '@neutralinojs/lib';
import { fileExists } from '@utils/fileExists';
import { parseJson } from '@utils/parseJson';
import { useEnv } from '@utils/useEnv';

export const useWineInstalledAppApiClient = () => {
  const env = useEnv();
  const WINE_APPS_PATH = env.get().WINE_APPS_PATH;

  const listAll = async () => {
    const entries = await filesystem.readDirectory(WINE_APPS_PATH);
    const directories = entries.filter((item) => item.type === 'DIRECTORY');
    let promises: Array<Promise<{ appPath: string; config: string } | undefined>> = [];
    let configs: Array<WineInstalledApp> = [];

    for (const dir of directories) {
      const APP_PATH = `${WINE_APPS_PATH}/${dir.entry}`;
      const CONFIG_FILE = `${APP_PATH}/${WINE_APP_CONFIG_JSON_PATH}`;
      const promise = new Promise<{ appPath: string; config: string } | undefined>(
        async (resolve) => {
          if (await fileExists(CONFIG_FILE)) {
            const config = await filesystem.readFile(CONFIG_FILE);
            resolve({ appPath: APP_PATH, config });
          } else {
            resolve(undefined);
          }
        }
      );
      promises.push(promise);
    }

    promises = promises.filter((item) => item !== undefined);
    configs = (await Promise.all(promises))
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
    return os.spawnProcess(`open "${appPath}"`);
  };

  const killApp = (pid: number) => {
    return os.spawnProcess(`kill ${pid}`);
  };

  return {
    listAll,
    runApp,
    killApp
  };
};
