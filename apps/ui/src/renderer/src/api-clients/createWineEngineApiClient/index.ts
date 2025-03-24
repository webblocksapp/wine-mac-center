import { filesystem } from '@neutralinojs/lib';
import { createEnv } from '@utils/createEnv';

export const createWineEngineApiClient = () => {
  const env = createEnv();

  /**
   * List the available wine engines.
   */
  const list = async () => {
    const engines = await filesystem.readDirectory(env.get().WINE_ENGINES_PATH);
    return engines
      .filter((item) => item.type === 'FILE' && item.entry !== '.DS_Store')
      .map((item) => item.entry.replace(/.tar.7z$/, ''));
  };

  return {
    list
  };
};
