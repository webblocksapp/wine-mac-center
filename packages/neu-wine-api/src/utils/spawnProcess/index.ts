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
            console.warn(evt.detail.data);
            callbacks?.onStdOut?.(evt.detail.data);
            break;
          case 'stdErr':
            console.error(evt.detail.data);
            callbacks?.onStdErr?.(evt.detail.data);
            break;
          case 'exit':
            console.log(evt.detail.data);
            callbacks?.onExit?.(evt.detail.data);
            resolve(undefined);
            break;
        }
      }
    });
  });
};
