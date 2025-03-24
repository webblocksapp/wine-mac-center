import { filesystem } from '@neutralinojs/lib';

/**
 * Check if a dir exists.
 */
export const dirExists = async (path: string) => {
  let exists = false;

  try {
    await filesystem.readDirectory(path);
    exists = true;
  } catch (error) {
    error;
  } finally {
    return exists;
  }
};
