import { os } from '@neutralinojs/lib';
import { Env } from '@interfaces';
import { loadBashScripts } from '@utils';

const ENV: Env = {};

export const useEnv = () => {
  const get = () => ENV;

  const cwd = async () => {
    const { stdOut } = await os.execCommand('pwd');
    return stdOut;
  };

  const init = async () => {
    const promises = [loadBashScripts()];
    await Promise.allSettled(promises);
  };

  return {
    get,
    init,
    cwd,
  };
};
