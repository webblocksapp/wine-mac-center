import { ENV } from '@constants';
import { os, init as initNeutralino } from '@neutralinojs/lib';
import path from 'path';

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
        ENV.SCRIPTS_PATH = path.join(ENV.DIRNAME, 'Contents/Resources/bash');
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
