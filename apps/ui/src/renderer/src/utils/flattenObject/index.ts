import { CommonObject } from '@interfaces/CommonObject';
import { formatObjectPath } from '@utils/formatObjectPath';

/**
 * Converts a nested object into a plain data structure.
 */
const addToObject = (data: any, path: string, flattenedObject: CommonObject) => {
  path = formatObjectPath(path);
  flattenedObject[path] = data;
};

export const flattenObject = (data: any, path: string = '', flattenedObject: CommonObject = {}) => {
  if (Array.isArray(data) && data.length === 0 && path) {
    addToObject(data, path, flattenedObject);
  } else if (typeof data === 'object') {
    for (const key in data) {
      flattenedObject = flattenObject(data[key], `${path}.${key}`, flattenedObject);
    }
  } else {
    addToObject(data, path, flattenedObject);
  }

  return flattenedObject;
};
