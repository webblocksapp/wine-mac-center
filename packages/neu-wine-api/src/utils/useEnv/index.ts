import { ENV } from '@constants';
import { os, init as initNeutralino } from '@neutralinojs/lib';
import { buildEnvExports } from '@utils';
import path from 'path';

export const useEnv = () => {
  const get = () => ENV;

  const init = async () => {
    initNeutralino();
    const promises = [initEnv()];
    await Promise.allSettled(promises);
  };

  const initEnv = async () => {
    switch (process.env.NODE_ENV) {
      case 'development':
        ENV.DIRNAME = (await os.execCommand('pwd')).stdOut.trim();
        ENV.RESOURCES_PATH = path.join(ENV.DIRNAME, 'Contents/Resources');
        break;
      default:
        ENV.DIRNAME = NL_PATH.trim();
        ENV.RESOURCES_PATH = path.join(ENV.DIRNAME, '../Resources');
        break;
    }

    ENV.HOME = (await os.execCommand('echo $HOME')).stdOut.trim();
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
    getEnvExports,
  };
};
