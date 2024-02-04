import { Winetrick } from '@interfaces';
import { os } from '@neutralinojs/lib';
import { useEnv } from '@utils';

export const useWinetrickApiClient = () => {
  const env = useEnv();
  const mapResponse = (data: string = ''): Winetrick[] => {
    const mappedData: Winetrick[] = [];
    const rows = data.split('\n');
    for (let row of rows) {
      if (!row) continue;
      const [verb, description] = row.replace(/\s/, '--_--').split('--_--');

      mappedData.push({
        verb,
        description: description?.replace?.(/^\s+/, ''),
      });
    }
    return mappedData;
  };

  const execScript = async (args: string) =>
    os.execCommand(`${env.get().SCRIPTS_PATH}/winetricks.sh ${args}`);

  const getWinetricks = async (cmd: string) => {
    const { stdOut, stdErr } = await execScript(cmd);
    if (stdErr) throw new Error(stdErr);
    return mapResponse(stdOut);
  };

  const help = () => {
    return execScript('--help');
  };

  const listApps = async () => {
    return getWinetricks('apps list');
  };

  const listBenchmarks = async () => {
    return getWinetricks('benchmarks list');
  };

  const listDlls = async () => {
    return getWinetricks('dlls list');
  };

  const listFonts = async () => {
    return getWinetricks('fonts list');
  };

  const listGames = async () => {
    return getWinetricks('games list');
  };

  const listSettings = () => {
    return getWinetricks('settings list');
  };

  return {
    help,
    listApps,
    listBenchmarks,
    listDlls,
    listFonts,
    listGames,
    listSettings,
  };
};
