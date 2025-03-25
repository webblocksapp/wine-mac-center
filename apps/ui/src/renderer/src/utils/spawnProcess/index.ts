import { SpawnProcessArgs } from '@interfaces/SpawnProcessArgs';

export const spawnProcess = (command: string, args?: SpawnProcessArgs): Promise<void> =>
  window.api.spawnProcess(command, args);
