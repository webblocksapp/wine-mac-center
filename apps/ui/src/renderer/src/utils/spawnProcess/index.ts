import { SpawnProcessArgs, UpdateProcess } from '@interfaces/SpawnProcessArgs';
import { events, os } from '@neutralinojs/lib';

export const spawnProcess = async (command: string, args?: SpawnProcessArgs): Promise<void> => {
  const { id } = await os.spawnProcess(command);

  const updateProcess: UpdateProcess = (action, data) => os.updateSpawnedProcess(id, action, data);

  args?.action && updateProcess(args.action.type, args.action.data);

  return new Promise((resolve) => {
    events.on('spawnedProcess', async (evt) => {
      if (id == evt.detail.id) {
        switch (evt.detail.action) {
          case 'stdOut':
            await args?.onStdOut?.(evt.detail.data, updateProcess);
            break;
          case 'stdErr':
            await args?.onStdErr?.(evt.detail.data, updateProcess);
            break;
          case 'exit':
            await args?.onExit?.(evt.detail.data);
            if (args) args = {}; //Callback is cleaned from subscription
            resolve(undefined);
            break;
        }
      }
    });
  });
};
