import { readDirectory } from '@utils/readDirectory';
import { createEnv } from '@utils/createEnv';

export const createWineEngineApiClient = () => {
  const env = createEnv();

  const list = async () => {
    const engines = await readDirectory(env.get().WINE_ENGINES_PATH);
    return engines
      .filter((item) => item !== '.DS_Store')
      .map((item) => item.replace(/.tar.7z$/, ''));
  };

  return {
    list
  };
};
