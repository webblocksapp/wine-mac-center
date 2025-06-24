import { SpawnProcessArgs } from '@interfaces/SpawnProcessArgs';

export const spawnProcess = async (command: string, args?: SpawnProcessArgs) => {
  const promise = window.api.spawnProcess(command);
  args?.onStdOut && window.api.onStdOut((data) => args?.onStdOut?.(data));
  args?.onStdErr && window.api.onStdErr((data) => args?.onStdErr?.(data));
  args?.onExit && window.api.onExit((data) => args?.onExit?.(data));
  return await promise;
};
