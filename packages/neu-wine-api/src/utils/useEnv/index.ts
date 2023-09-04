import { os, init as initNeutralino } from '@neutralinojs/lib';
import { Env } from '@interfaces';
import path from 'path';

const ENV: Env = {
  HOME: '',
  SCRIPTS_PATH: '',
  DIRNAME: '',
  WINE_APP_NAME: '',
  WINE_ENGINE_VERSION: '"Needs to be assigned manually"',
  WINE_APP_PATH: '',
  WINE_APP_CONTENTS_PATH: '',
  WINE_CONFIG_APP_NAME: '',
  WINE_CONFIG_APP_PATH: '',
  WINE_APP_SCRIPTS_PATH: '',
  WINE_APP_SHARED_SUPPORT_PATH: '',
  WINE_APP_PREFIX_PATH: '',
};

export const useEnv = () => {
  const get = () => ENV;

  const init = async () => {
    initNeutralino();
    const promises = [initEnv()];
    await Promise.allSettled(promises);
  };

  const initEnv = async () => {
    ENV.HOME = (await os.execCommand('echo $HOME')).stdOut.trim();

    switch (process.env.NODE_ENV) {
      case 'development':
        ENV.DIRNAME = (await os.execCommand('pwd')).stdOut.trim();
        ENV.SCRIPTS_PATH = path.join(ENV.DIRNAME, 'src/bash');
        ENV.WINE_APP_NAME = 'TestApp';
        ENV.WINE_APP_PATH = `${ENV.HOME}/Wine/apps/${ENV.WINE_APP_NAME}.app`;
        break;
      default:
        ENV.DIRNAME = NL_PATH.trim();
        ENV.SCRIPTS_PATH = path.join(ENV.DIRNAME, '../Resources/bash');
        ENV.WINE_APP_NAME = '"Needs to be assigned manually"';
        ENV.WINE_APP_PATH = `${ENV.HOME}/Wine/apps/test-app.app`;
        break;
    }

    ENV.WINE_APP_CONTENTS_PATH = `${ENV.WINE_APP_PATH}/Contents`;
    ENV.WINE_CONFIG_APP_NAME = `config-app`;
    ENV.WINE_CONFIG_APP_PATH = `${ENV.WINE_APP_PATH}/${ENV.WINE_CONFIG_APP_NAME}.app`;
    ENV.WINE_APP_SCRIPTS_PATH = `${ENV.WINE_APP_CONTENTS_PATH}/Resources/bash`;
    ENV.WINE_APP_SHARED_SUPPORT_PATH = `${ENV.WINE_APP_CONTENTS_PATH}/SharedSupport`;
    ENV.WINE_APP_PREFIX_PATH = `${ENV.WINE_APP_SHARED_SUPPORT_PATH}/prefix`;
  };

  const dirname = () => ENV.DIRNAME;

  return {
    dirname,
    get,
    init,
  };
};
