import { BashScript, SpawnProcessCallbacks, WineEnv } from '@interfaces';
import { os, filesystem } from '@neutralinojs/lib';
import {
  buildEnvExports,
  spawnProcess as baseSpawnProcess,
  useEnv,
} from '@utils';

type UpdatableWineEnv = Partial<
  Pick<WineEnv, 'WINE_APP_NAME' | 'WINE_ENGINE_VERSION'>
>;

export const useWine = () => {
  const env = useEnv();
  const SCRIPTS_PATH = env.get().SCRIPTS_PATH;
  let WINE_EXPORTS = '';
  let ENV_EXPORTS = env.getEnvExports();

  const WINE_ENV = {
    WINE_APP_NAME: 'Test App',
    WINE_ENGINE_VERSION: '',
    get WINE_APP_PATH() {
      return `${env.get().HOME}/Wine/apps/${WINE_ENV.WINE_APP_NAME}.app`;
    },
    get WINE_ENGINES_PATH() {
      return `${env.get().HOME}/Wine/engines`;
    },
    get WINE_LIBS_PATH() {
      return `${env.get().HOME}/Wine/libs`;
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
      WINE_ENV[key as keyof UpdatableWineEnv] = value.trim();
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
   * List the available wine engines.
   */
  const listWineEngines = async () =>
    filesystem.readDirectory(WINE_ENV.WINE_ENGINES_PATH);

  /**
   * Logic for creating the wine application structure.
   */
  const scaffoldApp = async (
    options: Pick<UpdatableWineEnv, 'WINE_APP_NAME'>,
    callbacks?: SpawnProcessCallbacks
  ) => {
    updateWineEnv(options);
    const { stdOut, stdErr } = await execScript('buildUniqueAppName');
    if (stdErr) throw new Error(stdErr);
    updateWineEnv({ WINE_APP_NAME: stdOut });
    return spawnScript('scaffoldApp', '', callbacks);
  };

  /**
   * Logic for extracting the wine engine.
   */
  const extractEngine = async (
    options: Pick<UpdatableWineEnv, 'WINE_APP_NAME' | 'WINE_ENGINE_VERSION'>,
    callbacks?: SpawnProcessCallbacks
  ) => {
    updateWineEnv(options);
    return spawnScript('extractWineEngine', '', callbacks);
  };

  /**
   * Initializes the wine prefix.
   */
  const wineboot = async (
    options: Pick<UpdatableWineEnv, 'WINE_APP_NAME'>,
    callbacks?: SpawnProcessCallbacks
  ) => {
    updateWineEnv(options);
    return spawnScript('wineboot', '', callbacks);
  };

  /**
   * Builds the wine env source by using the env.sh script.
   */
  const wineEnvSource = () => `source ${SCRIPTS_PATH}/env.sh;`;

  /**
   * Enable DXVK
   */
  const enableDxvk = (
    options: Pick<UpdatableWineEnv, 'WINE_APP_NAME'>,
    callbacks?: SpawnProcessCallbacks
  ) => {
    updateWineEnv(options);
    return spawnScript('enableDxvk', '', callbacks);
  };

  const execScript = (name: BashScript, args: string = '') =>
    execCommand(`${SCRIPTS_PATH}/${name}.sh ${args}`);

  const spawnScript = (
    name: BashScript,
    args: string = '',
    callbacks?: SpawnProcessCallbacks
  ) => spawnProcess(`${SCRIPTS_PATH}/${name}.sh ${args}`, callbacks);

  const execCommand: typeof os.execCommand = (command, options) =>
    os.execCommand(
      `${ENV_EXPORTS} ${wineEnvSource()} ${WINE_EXPORTS} ${command}`,
      options
    );

  const spawnProcess = (command: string, options?: SpawnProcessCallbacks) =>
    baseSpawnProcess(
      `${ENV_EXPORTS} ${WINE_EXPORTS} ${wineEnvSource()} ${command}`,
      options
    );

  const getWineEnv = () => WINE_ENV;

  return {
    execCommand,
    execScript,
    getWineEnv,
    scaffoldApp,
    spawnProcess,
    spawnScript,
    listWineEngines,
    extractEngine,
    wineboot,
    enableDxvk,
  };
};
