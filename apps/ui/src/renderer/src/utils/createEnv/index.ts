import path from 'path';
import { ENV } from '@constants/envs';
import { buildEnvExports } from '@utils/buildEnvExports';
import { execCommand } from '@utils/execCommand';
import { getAppPath } from '@utils/getAppPath';

export const createEnv = () => {
  const get = () => ENV;

  const init = async (mode = process.env.NODE_ENV) => {
    const promises = [initEnv(mode)];
    await Promise.allSettled(promises);
  };

  const initEnv = async (mode: string | undefined) => {
    ENV.DIRNAME = await getAppPath();

    switch (mode) {
      case 'development':
      case 'integration':
        ENV.RESOURCES_PATH = path.join(ENV.DIRNAME, 'Contents/Resources');
        break;
      default:
        ENV.RESOURCES_PATH = path.join(ENV.DIRNAME, '../Resources');
        break;
    }

    ENV.HOME = (await execCommand('echo $HOME')).stdOut.trim();
    ENV.WINE_APPS_PATH = `${ENV.HOME}/Wine/apps`;
    ENV.WINE_ASSETS_PATH = `${ENV.HOME}/Wine/assets`;
    ENV.WINE_ENGINES_PATH = `${ENV.HOME}/Wine/engines`;
    ENV.WINE_TMP_PATH = `${ENV.HOME}/Wine/tmp`;
    ENV.WINE_LIBS_PATH = `${ENV.HOME}/Wine/libs`;
    ENV.SCRIPTS_PATH = `${ENV.RESOURCES_PATH}/bash`;
    ENV.INTERNAL_APPS_PATH = `${ENV.RESOURCES_PATH}/apps`;
    ENV.COMPRESSED_PATH = `${ENV.RESOURCES_PATH}/compressed`;
  };

  const dirname = () => ENV.DIRNAME;

  const getEnvExports = () => buildEnvExports(ENV);

  return {
    dirname,
    get,
    init,
    getEnvExports
  };
};
