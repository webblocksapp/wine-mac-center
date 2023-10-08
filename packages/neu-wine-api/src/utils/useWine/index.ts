import { BashScript, SpawnProcessCallbacks, WineEnv } from '@interfaces';
import { os } from '@neutralinojs/lib';
import {
  buildEnvExports,
  spawnProcess as baseSpawnProcess,
  useEnv,
} from '@utils';

type UpdatableWineEnv = Pick<WineEnv, 'WINE_APP_NAME'>;

export const useWine = () => {
  const env = useEnv();
  const SCRIPTS_PATH = env.get().SCRIPTS_PATH;
  let WINE_EXPORTS = '';
  let ENV_EXPORTS = env.getEnvExports();

  const WINE_ENV = {
    WINE_APP_NAME: 'Test App',
    get WINE_APP_PATH() {
      return `${env.get().HOME}/Wine/apps/${WINE_ENV.WINE_APP_NAME}.app`;
    },
    get WINE_APP_CONTENTS_PATH() {
      return `${WINE_ENV.WINE_APP_PATH}/Contents`;
    },
    get WINE_CONFIG_APP_NAME() {
      return 'Config';
    },
    get WINE_CONFIG_APP_PATH() {
      return `${WINE_ENV.WINE_APP_PATH}/${WINE_ENV.WINE_CONFIG_APP_NAME}.app`;
    },
    get WINE_APP_SCRIPTS_PATH() {
      return `${WINE_ENV.WINE_CONFIG_APP_PATH}/Resources/bash`;
    },
    get WINE_APP_SHARED_SUPPORT_PATH() {
      return `${WINE_ENV.WINE_APP_CONTENTS_PATH}/SharedSupport`;
    },
    get WINE_APP_PREFIX_PATH() {
      return `${WINE_ENV.WINE_APP_SHARED_SUPPORT_PATH}/prefix`;
    },
  };

  const updateWineEnv = (wineEnv?: UpdatableWineEnv) => {
    if (wineEnv === undefined) return;

    for (let [key, value] of Object.entries(wineEnv)) {
      WINE_ENV[key as keyof UpdatableWineEnv] = value;
    }

    buildWineEnvExports();
  };

  /**
   * Build wine environment variables exports.
   */
  const buildWineEnvExports = () => {
    WINE_EXPORTS = buildEnvExports(WINE_ENV, (envName) =>
      Boolean(envName.match(/(^WINE)/gi)?.length)
    );
  };

  /**
   * Initializes wine env exports.
   */
  buildWineEnvExports();

  /**
   * Logic for creating the wine application structure.
   */
  const scaffoldApp = async (
    callbacks?: SpawnProcessCallbacks,
    options?: { env?: UpdatableWineEnv }
  ) => {
    options?.env && updateWineEnv(options.env);

    const { stdOut, stdErr } = await execScript('buildUniqueAppName');
    if (stdErr) throw new Error(stdErr);
    updateWineEnv({ WINE_APP_NAME: stdOut.trim() });
    return spawnScript('scaffoldApp', '', callbacks);
  };

  const execScript = (name: BashScript, args: string = '') =>
    execCommand(`${SCRIPTS_PATH}/${name}.sh ${args}`);

  const spawnScript = (
    name: BashScript,
    args: string = '',
    callbacks?: SpawnProcessCallbacks
  ) => spawnProcess(`${SCRIPTS_PATH}/${name}.sh ${args}`, callbacks);

  const execCommand: typeof os.execCommand = (command, options) =>
    os.execCommand(`${ENV_EXPORTS} ${WINE_EXPORTS} ${command}`, options);

  const spawnProcess = (command: string, options?: SpawnProcessCallbacks) =>
    baseSpawnProcess(`${ENV_EXPORTS} ${WINE_EXPORTS} ${command}`, options);

  const getWineEnv = () => WINE_ENV;

  return {
    execCommand,
    execScript,
    getWineEnv,
    scaffoldApp,
    spawnProcess,
    spawnScript,
  };
};
