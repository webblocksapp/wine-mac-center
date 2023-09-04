import { os, init as initNeutralino } from '@neutralinojs/lib';
import { Env } from '@interfaces';
import path from 'path';

const ENV: Env = {};

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
        ENV.SCRIPTS_PATH = path.join(ENV.DIRNAME, 'src/bash');
        break;
      default:
        ENV.DIRNAME = NL_PATH.trim();
        ENV.SCRIPTS_PATH = path.join(ENV.DIRNAME, '../Resources/bash');
        break;
    }
  };

  const dirname = () => ENV.DIRNAME;

  return {
    dirname,
    get,
    init,
  };
};
