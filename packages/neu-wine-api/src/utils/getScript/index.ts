import { BASH_SCRIPTS } from '@constants';

export const getScript = (path: string) => {
  path = path.replace(/^\//, '');

  for (let key in BASH_SCRIPTS) {
    if (key.match(`/${path}`)) {
      return `f(){\n${BASH_SCRIPTS[key]}\n}; f`;
    }
  }

  return '';
};
