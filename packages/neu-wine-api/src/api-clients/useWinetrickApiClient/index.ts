import { Winetrick } from '@interfaces';
import { createWine } from '@utils';
import { useMemo } from 'react';

export const useWinetrickApiClient = () => {
  const wine = useMemo(() => createWine(), []);

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
    wine.execScript('winetricks', args);

  const getWinetricks = async (cmd: string) => {
    const { stdOut, stdErr } = await execScript(cmd);
    return { stdOut: mapResponse(stdOut), stdErr: stdErr };
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
