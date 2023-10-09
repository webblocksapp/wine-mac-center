import { SpawnProcessCallbacks } from '@interfaces';
import { events, os } from '@neutralinojs/lib';

export const spawnProcess = async (
  command: string,
  callbacks?: SpawnProcessCallbacks
): Promise<void> => {
  const { id } = await os.spawnProcess(command);

  return new Promise((resolve) => {
    events.on('spawnedProcess', (evt) => {
      if (id == evt.detail.id) {
        switch (evt.detail.action) {
          case 'stdOut':
            callbacks?.onStdOut?.(evt.detail.data);
            break;
          case 'stdErr':
            callbacks?.onStdErr?.(evt.detail.data);
            break;
          case 'exit':
            callbacks?.onExit?.(evt.detail.data);
            if (callbacks) callbacks = {}; //Callback is cleaned from subscription
            resolve(undefined);
            break;
        }
      }
    });
  });
};
