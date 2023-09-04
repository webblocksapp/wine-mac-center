import { BashScript } from '@interfaces';
import { os } from '@neutralinojs/lib';
import { useEnv } from '@utils';
import { buildEnvExports } from '../buildEnvExports';

export const useWine = () => {
  const env = useEnv();

  const runScript = (name: BashScript, args: string = '') =>
    execCommand(`${env.get().SCRIPTS_PATH}/${name}.sh ${args}`);

  const execCommand: typeof os.execCommand = (command, options) => {
    const WINE_EXPORTS = buildEnvExports(env.get(), (envName) =>
      Boolean(envName.match(/(^WINE)/gi)?.length)
    );
    return os.execCommand(`${WINE_EXPORTS} ${command}`, options);
  };

  return {
    runScript,
    execCommand,
  };
};
