import { BASH_SCRIPTS } from '@constants';

export const loadBashScripts = async () => {
  const bashScripts = import.meta.glob('../../bash/*.sh', { as: 'raw' });
  const promises: Promise<void>[] = [];

  for (let [key, value] of Object.entries(bashScripts)) {
    promises.push(
      new Promise(async (resolve) => {
        BASH_SCRIPTS[key] = await value();
        resolve();
      })
    );
  }

  await Promise.all(promises);
};
