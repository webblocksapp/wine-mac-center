import { Winetrick } from '@interfaces';
import { os } from '@neutralinojs/lib';
import { getBashScript } from '@utils';

export const useWinetrickApiClient = () => {
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

  const runScript = async (cmd: string) => {
    const { stdOut } = await os.execCommand(
      `${getBashScript('winetricks.sh')} ${cmd}`
    );

    return stdOut;
  };

  const getWinetricks = async (cmd: string) => {
    return mapResponse(await runScript(cmd));
  };

  const help = async () => {
    return await runScript('--help');
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

  const listAll = async () =>
    (
      await Promise.all([
        listApps(),
        listBenchmarks(),
        listDlls(),
        listFonts(),
        listGames(),
        listSettings(),
      ])
    ).flat();

  return {
    help,
    listApps,
    listBenchmarks,
    listDlls,
    listFonts,
    listGames,
    listSettings,
    listAll,
  };
};
