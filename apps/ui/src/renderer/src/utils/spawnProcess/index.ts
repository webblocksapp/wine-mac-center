import { SpawnProcessArgs } from '@interfaces/SpawnProcessArgs';

export const spawnProcess = (command: string, args?: SpawnProcessArgs) =>
  window.api.spawnProcess(command, args);
