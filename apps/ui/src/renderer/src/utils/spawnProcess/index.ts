import { SpawnProcessArgs } from '@interfaces/SpawnProcessArgs';

export const spawnProcess = async (command: string, args?: SpawnProcessArgs) => {
  const promise = window.api.spawnProcess(command);
  const action = args?.action;
  if (action) {
    const { pid } = await promise;
    switch (action.type) {
      case 'stdIn':
        window.api.spawnStdin({ pid, data: action.data });
        break;
      case 'stdInEnd':
      case 'exit':
        window.api.spawnStdinEnd({ pid });
        break;
      default:
        break;
    }
  }
  args?.onStdOut && window.api.onStdOut((data) => args?.onStdOut?.(data));
  args?.onStdErr && window.api.onStdErr((data) => args?.onStdErr?.(data));
  args?.onExit && window.api.onExit((data) => args?.onExit?.(data));
  return promise;
};
