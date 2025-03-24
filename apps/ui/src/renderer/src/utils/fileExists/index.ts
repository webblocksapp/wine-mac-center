import { filesystem } from '@neutralinojs/lib';

/**
 * Check if config file exists.
 */
export const fileExists = async (path: string) => {
  let exists = false;

  try {
    await filesystem.readFile(path);
    exists = true;
  } catch (error) {
    error;
  } finally {
    return exists;
  }
};
