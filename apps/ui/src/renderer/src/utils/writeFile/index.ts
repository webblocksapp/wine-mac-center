import { filesystem } from '@neutralinojs/lib';
import { fileExists } from '@utils/fileExists';

/**
 * Write app config.json in disk.
 */
export const writeFile = async (path: string, data: string) => {
  if (await fileExists(path)) {
    await filesystem.writeFile(path, data);
  } else {
    await filesystem.appendFile(path, data);
  }
};
