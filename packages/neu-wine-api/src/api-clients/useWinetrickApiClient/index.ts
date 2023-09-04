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

  const listApps = async () => {
    return runWinetricks('apps list');
  };

  const listBenchmarks = async () => {
    return runWinetricks('benchmarks list');
  };

  const listDlls = async () => {
    return runWinetricks('dlls list');
  };

  const listFonts = async () => {
    return runWinetricks('fonts list');
  };

  const listGames = async () => {
    return runWinetricks('games list');
  };

  const listSettings = () => {
    return runWinetricks('settings list');
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

  const runWinetricks = async (cmd: string) => {
    const { stdOut } = await os.execCommand(
      `${getBashScript('winetricks.sh')} ${cmd}`
    );

    return mapResponse(stdOut);
  };

  return {
    listApps,
    listBenchmarks,
    listDlls,
    listFonts,
    listGames,
    listSettings,
    listAll,
  };
};
