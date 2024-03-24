import {
  BashScript,
  SpawnProcessArgs,
  WineAppConfig,
  WineAppExecutable,
  WinetricksOptions,
} from '@interfaces';
import { os, filesystem } from '@neutralinojs/lib';
import plist from 'plist';
import {
  buildEnvExports,
  spawnProcess as baseSpawnProcess,
  fileExists,
  writeFile,
  useEnv,
  downloadFile,
} from '@utils';
import { useWineEngineApiClient } from '@api-clients';
import { FileName } from '@constants';

export const createWineApp = async (appName: string) => {
  const env = useEnv();
  const wineEngineApiClient = useWineEngineApiClient();
  const SCRIPTS_PATH = env.get().SCRIPTS_PATH;

  let appConfig: WineAppConfig = {
    appId: '',
    name: appName,
    engineVersion: '',
    setupExecutablePath: '',
    iconURL: '',
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
      return env.get().WINE_ENGINES_PATH;
    },
    get WINE_TMP_PATH() {
      return env.get().WINE_TMP_PATH;
    },
    get WINE_LIBS_PATH() {
      return env.get().WINE_LIBS_PATH;
    },
    get WINE_APP_CONTENTS_PATH() {
      return `${WINE_ENV.WINE_APP_PATH}/Contents`;
    },
    get WINE_APP_RESOURCES_PATH() {
      return `${WINE_ENV.WINE_APP_CONTENTS_PATH}/Resources`;
    },
    get WINE_CONFIG_APP_NAME() {
      return 'Config';
    },
    get WINE_CONFIG_APP_PATH() {
      return `${WINE_ENV.WINE_APP_PATH}/${WINE_ENV.WINE_CONFIG_APP_NAME}.app`;
    },
    get WINE_CONFIG_APP_RESOURCES_PATH() {
      return `${WINE_ENV.WINE_CONFIG_APP_PATH}/Contents/Resources`;
    },
    get WINE_APP_SCRIPTS_PATH() {
      return `${WINE_ENV.WINE_CONFIG_APP_RESOURCES_PATH}/bash`;
    },
    get WINE_APP_DATA_PATH() {
      return `${WINE_ENV.WINE_CONFIG_APP_RESOURCES_PATH}/data`;
    },
    get WINE_APP_CONFIG_JSON_PATH() {
      return `${WINE_ENV.WINE_APP_DATA_PATH}/config.json`;
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

  /**
   * Read app config file.
   */
  const readAppConfig = async (): Promise<WineAppConfig> => {
    const path = WINE_ENV.WINE_APP_CONFIG_JSON_PATH;

    if (await fileExists(path)) {
      return JSON.parse(await filesystem.readFile(path)) as WineAppConfig;
    } else {
      return appConfig;
    }
  };

  const getAppConfig = () => appConfig;

  const updateAppConfig = async (
    data: Partial<WineAppConfig>,
    options = { writeAppConfig: true },
  ) => {
    appConfig = { ...appConfig, ...data };
    options.writeAppConfig && (await writeAppConfig(appConfig));
    buildWineEnvExports();
  };

  /**
   * Build wine environment variables exports.
   */
  const buildWineEnvExports = () => {
    WINE_EXPORTS = buildEnvExports(WINE_ENV, (envName) =>
      Boolean(envName.match(/(^WINE)/gi)?.length),
    );
  };

  /**
   * Logic for creating the wine application structure.
   */
  const scaffold = async (appIconURL: string, args?: SpawnProcessArgs) => {
    const { stdOut, stdErr } = await execScript('buildUniqueAppName');
    if (stdErr) throw new Error(stdErr);
    if (appName != stdOut) {
      appName = stdOut.trim();
      await updateAppConfig({ name: appName }, { writeAppConfig: false });
    }
    return spawnScript('scaffoldApp', '', {
      ...args,
      onExit: async (data) => {
        await args?.onExit?.(data);
        await updateAppConfig({ name: appName });
        await setupAppIcon(appIconURL);
      },
    });
  };

  const setupAppIcon = async (appIconURL: string) => {
    try {
      filesystem.writeBinaryFile(
        `${WINE_ENV.WINE_APP_RESOURCES_PATH}/${FileName.CFBundleIconFile}`,
        await downloadFile(appIconURL),
      );
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Logic for extracting the wine engine.
   */
  const extractEngine = async (version: string, args?: SpawnProcessArgs) => {
    await updateAppConfig({ engineVersion: version });
    return spawnScript('extractWineEngine', '', args);
  };

  /**
   * Initializes the wine prefix.
   */
  const wineboot = async (flags = '', args?: SpawnProcessArgs) => {
    return spawnScript('wineboot', flags, args);
  };

  /**
   * Builds the wine env source by using the env.sh script.
   */
  const wineEnvSource = () => `source ${SCRIPTS_PATH}/env.sh;`;

  /**
   * Winetrick
   */
  const winetrick = (
    verbs: string,
    processArgs?: SpawnProcessArgs,
    options?: WinetricksOptions,
  ) => {
    const flags = winetricksOptionsToFlags(options);
    return spawnScript('winetrick', `${flags} ${verbs}`, processArgs);
  };

  /**
   * Search provided executable.
   */
  const setSetupExe = async (exeURLs: string[]) => {
    let downloadedExe = false;

    for (let i = 0; i < exeURLs.length; i++) {
      if (downloadedExe) continue;
      const exeURL = exeURLs[i];
      const fileName = exeURL.split('/').pop();
      if (fileName === undefined) throw new Error('Invalid filename');

      try {
        filesystem.writeBinaryFile(
          `${WINE_ENV.WINE_TMP_PATH}/${fileName}`,
          await downloadFile(exeURL),
        );
        downloadedExe = true;
      } catch (error) {
        console.error(error);
      }
    }

    if (downloadedExe === false) {
      alert('Please provide a setup executable');
    }
  };

  /**
   * Run executable with wine.
   */
  const runExe = (args: string, processArgs?: SpawnProcessArgs) => {
    return spawnScript('wine', args, processArgs);
  };

  /**
   * Run winecfg.
   */
  const winecfg = (processArgs?: SpawnProcessArgs) => {
    return spawnScript('winecfg', '', processArgs);
  };

  /**
   * Write app config.json in disk.
   */
  const writeAppConfig = async (appConfig: Partial<WineAppConfig>) => {
    const updatedAppConfig = { ...(await readAppConfig()), ...appConfig };
    await writeFile(
      WINE_ENV.WINE_APP_CONFIG_JSON_PATH,
      JSON.stringify(updatedAppConfig),
    );
  };

  /**
   * Run executable with wine
   */
  const bundleApp = async (
    executables: WineAppExecutable[],
    args?: SpawnProcessArgs,
  ) => {
    await updateAppConfig({
      executables,
    });

    const mainExecutable = executables.find((item) => item.main === true);
    const infoPlistXML = plist
      .build({
        CFBundleExecutable: FileName.CFBundleExecutable,
        CFBundleIconFile: FileName.CFBundleIconFile,
      })
      .replace(/\n/gi, '');

    const exePath = mainExecutable!.path.replace(/\n/gi, '');

    return spawnScript('bundleApp', '', {
      ...args,
      action: {
        type: 'stdIn',
        data: `${infoPlistXML}\n ${exePath}\n`,
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
    processArgs?: SpawnProcessArgs,
  ) => spawnProcess(s(`${SCRIPTS_PATH}/${name}.sh ${scriptArgs}`), processArgs);

  const execCommand: typeof os.execCommand = (command, options) =>
    os.execCommand(s(command), options);

  const spawnProcess = (command: string, args?: SpawnProcessArgs) =>
    baseSpawnProcess(s(command), args);

  const getWineEnv = () => WINE_ENV;

  /**
   * Initialize wine env exports.
   */
  buildWineEnvExports();

  /**
   * Initialize app config.
   */
  appConfig = { ...(await readAppConfig()), name: appName };

  return {
    execCommand,
    execScript,
    getWineEnv,
    scaffold,
    spawnProcess,
    spawnScript,
    listWineEngines: wineEngineApiClient.list,
    extractEngine,
    wineboot,
    winecfg,
    winetrick,
    runExe,
    setSetupExe,
    bundleApp,
    listAppExecutables,
    getAppConfig,
  };
};
