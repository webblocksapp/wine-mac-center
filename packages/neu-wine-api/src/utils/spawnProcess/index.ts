import { SpawnProcessArgs, UpdateProcess } from '@interfaces';
import { events, os } from '@neutralinojs/lib';

export const spawnProcess = async (
  command: string,
  args?: SpawnProcessArgs
): Promise<void> => {
  const { id } = await os.spawnProcess(command);

  const updateProcess: UpdateProcess = (action, data) =>
    os.updateSpawnedProcess(id, action, data);

  args?.action && updateProcess(args.action.type, args.action.data);

  return new Promise((resolve) => {
    events.on('spawnedProcess', (evt) => {
      if (id == evt.detail.id) {
        switch (evt.detail.action) {
          case 'stdOut':
            args?.onStdOut?.(evt.detail.data, updateProcess);
            break;
          case 'stdErr':
            args?.onStdErr?.(evt.detail.data, updateProcess);
            break;
          case 'exit':
            args?.onExit?.(evt.detail.data);
            if (args) args = {}; //Callback is cleaned from subscription
            resolve(undefined);
            break;
        }
      }
    });
  });
};
