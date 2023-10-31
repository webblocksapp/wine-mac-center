import {
  BashScript,
  SpawnProcessArgs,
  WineAppConfig,
  WinetricksOptions,
} from '@interfaces';
import { os, filesystem } from '@neutralinojs/lib';
import plist from 'plist';
import {
  buildEnvExports,
  spawnProcess as baseSpawnProcess,
  useEnv,
} from '@utils';

export const createWineApp = async (appName: string) => {
  const env = useEnv();
  const SCRIPTS_PATH = env.get().SCRIPTS_PATH;
  let appConfig: WineAppConfig = {
    name: appName,
    engineVersion: '',
    setupExecutablePath: '',
    dxvkEnabled: false,
  };

  let WINE_EXPORTS = '';
  let ENV_EXPORTS = env.getEnvExports();

  const WINE_ENV = {
    get WINE_APP_NAME() {
      return appConfig.name;
    },
    get WINE_ENGINE_VERSION() {
      return appConfig.engineVersion || '';
    },
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
    get WINE_APP_DATA_PATH() {
      return `${WINE_ENV.WINE_CONFIG_APP_PATH}/Resources/data`;
    },
    get WINE_APP_SHARED_SUPPORT_PATH() {
      return `${WINE_ENV.WINE_APP_CONTENTS_PATH}/SharedSupport`;
    },
    get WINE_APP_PREFIX_PATH() {
      return `${WINE_ENV.WINE_APP_SHARED_SUPPORT_PATH}/prefix`;
    },
    get WINE_APP_DRIVE_C_PATH() {
      return `${WINE_ENV.WINE_APP_PREFIX_PATH}/drive_c`;
    },
  };

  const getAppConfig = () => appConfig;

  const updateAppConfig = (data: Partial<WineAppConfig>) => {
    appConfig = { ...appConfig, ...data };
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
   * List the available wine engines.
   */
  const listWineEngines = async () => {
    const engines = await filesystem.readDirectory(WINE_ENV.WINE_ENGINES_PATH);
    return engines
      .filter((item) => item.type === 'FILE' && item.entry !== '.DS_Store')
      .map((item) => item.entry.replace(/.tar.7z$/, ''));
  };

  /**
   * Logic for creating the wine application structure.
   */
  const scaffold = async (args?: SpawnProcessArgs) => {
    updateAppConfig({ name: appName });
    const { stdOut, stdErr } = await execScript('buildUniqueAppName');
    if (stdErr) throw new Error(stdErr);
    if (appName != stdOut) updateAppConfig({ name: stdOut.trim() });
    return spawnScript('scaffoldApp', '', args);
  };

  /**
   * Logic for extracting the wine engine.
   */
  const extractEngine = async (version: string, args?: SpawnProcessArgs) => {
    updateAppConfig({ engineVersion: version });
    return spawnScript('extractWineEngine', '', args);
  };

  /**
   * Initializes the wine prefix.
   */
  const wineboot = async (args?: SpawnProcessArgs) => {
    return spawnScript('wineboot', '', args);
  };

  /**
   * Builds the wine env source by using the env.sh script.
   */
  const wineEnvSource = () => `source ${SCRIPTS_PATH}/env.sh;`;

  /**
   * Enable DXVK
   */
  const enableDxvk = (args?: SpawnProcessArgs) => {
    updateAppConfig({ dxvkEnabled: true });
    return spawnScript('enableDxvk', '', args);
  };

  /**
   * Winetrick
   */
  const winetrick = (
    verbs: string,
    processArgs?: SpawnProcessArgs,
    options?: WinetricksOptions
  ) => {
    const flags = winetricksOptionsToFlags(options);
    return spawnScript('winetrick', `${flags} ${verbs}`, processArgs);
  };

  /**
   * Run executable with wine
   */
  const runExe = (args: string, processArgs?: SpawnProcessArgs) => {
    return spawnScript('wine', args, processArgs);
  };

  /**
   * Initializes app config
   */
  const initAppConfig = async () => {
    let str: string | undefined;

    try {
      str = await filesystem.readFile(
        `${WINE_ENV.WINE_APP_DATA_PATH}/config.json`
      );
      appConfig = JSON.parse(str) as unknown as WineAppConfig;
    } catch (error) {
      error;
    } finally {
      appConfig;
    }
  };

  /**
   * Run executable with wine
   */
  const bundleApp = (options: { exePath: string }, args?: SpawnProcessArgs) => {
    updateAppConfig({ executables: [{ main: true, path: options.exePath }] });

    const infoPlistXML = plist
      .build([
        'metadata',
        {
          CFBundleExecutable: 'winemacapp',
          CFBundleIconFile: 'winemacapp.ics',
        },
      ])
      .replace(/\n/gi, '');

    const jsonString = 'AAAAA'.replace(/\n/gi, '');
    const exePath = options.exePath.replace(/\n/gi, '');

    return spawnScript('bundleApp', '', {
      ...args,
      action: {
        type: 'stdIn',
        data: `${infoPlistXML}\n ${jsonString}\n ${exePath}\n`,
      },
    });
  };

  /**
   * List app executables
   */
  const listAppExecutables = async () => {
    const { stdOut } = await execScript('listAppExecutables');

    return (
      stdOut.split('\n').map((item) => ({
        path: item.split('SharedSupport/prefix').pop() || '',
        name: item.split('/').pop() || '',
      })) || []
    );
  };

  /**
   * Transform winetricks options into flags.
   */
  const winetricksOptionsToFlags = (options?: WinetricksOptions) => {
    options = { unattended: true, force: true, ...options };
    let flags = '';
    if (options?.unattended) flags += '--unattended ';
    if (options?.force) flags += '--force ';

    return `"${flags}"`;
  };

  /**
   * Bash scripts source.
   */
  const s = (cmd: string) =>
    `${ENV_EXPORTS} ${WINE_EXPORTS} ${wineEnvSource()} ${cmd}`;

  const execScript = (name: BashScript, args: string = '') =>
    execCommand(s(`${SCRIPTS_PATH}/${name}.sh ${args}`));

  const spawnScript = (
    name: BashScript,
    scriptArgs: string = '',
    processArgs?: SpawnProcessArgs
  ) => spawnProcess(s(`${SCRIPTS_PATH}/${name}.sh ${scriptArgs}`), processArgs);

  const execCommand: typeof os.execCommand = (command, options) =>
    os.execCommand(s(command), options);

  const spawnProcess = (command: string, args?: SpawnProcessArgs) =>
    baseSpawnProcess(s(command), args);

  const getWineEnv = () => WINE_ENV;

  /**
   * Initializes wine env exports.
   */
  buildWineEnvExports();

  /**
   * Initializes app config.
   */
  await initAppConfig();

  return {
    execCommand,
    execScript,
    getWineEnv,
    scaffold,
    spawnProcess,
    spawnScript,
    listWineEngines,
    extractEngine,
    wineboot,
    enableDxvk,
    winetrick,
    runExe,
    bundleApp,
    listAppExecutables,
    getAppConfig,
  };
};
