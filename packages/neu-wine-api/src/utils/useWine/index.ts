import { BashScript } from '@interfaces';
import { os } from '@neutralinojs/lib';
import { useEnv } from '@utils';

export const useWine = () => {
  const env = useEnv();

  const runScript = (name: BashScript, args: string = '') =>
    os.execCommand(`${env.get().SCRIPTS_PATH}/${name}.sh ${args}`);

  return {
    runScript,
  };
};
