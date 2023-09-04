import { os, init as initNeutralino } from '@neutralinojs/lib';
import { Env } from '@interfaces';
import { loadBashScripts } from '@utils';

const ENV: Env = {};

export const useEnv = () => {
  const get = () => ENV;

  const init = async () => {
    initNeutralino();
    const promises = [initDirName(), loadBashScripts()];
    await Promise.allSettled(promises);
  };

  const initDirName = async () => {
    switch (process.env.NODE_ENV) {
      case 'development':
        ENV.DIRNAME = (await os.execCommand('pwd')).stdOut;
        break;
      default:
        ENV.DIRNAME = NL_PATH;
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
