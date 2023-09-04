import { BASH_SCRIPTS } from '@constants';

export const getScript = (path: string) => {
  path = path.replace(/^\//, '');

  for (let key in BASH_SCRIPTS) {
    if (key.match(`/${path}`)) {
      return BASH_SCRIPTS[key];
    }
  }

  return '';
};
