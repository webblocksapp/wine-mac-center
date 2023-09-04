import { BASH_SCRIPTS } from '@constants';
import { randomId } from '@utils';

export const getBashScript = (path: string) => {
  path = path.replace(/^\//, '');

  for (let key in BASH_SCRIPTS) {
    if (key.match(`/${path}`)) {
      const id = randomId();
      return `f${id}(){\n${BASH_SCRIPTS[key]}\n}; f${id}`;
    }
  }

  return '';
};
