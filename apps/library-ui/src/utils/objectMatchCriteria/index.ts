import { escapeRegExp, flattenObject } from '@utils';

/**
 * Checks if any object matches any criteria
 */
export const objectMatchCriteria = <T>(
  data: T,
  criteria: string,
  scopeKeys?: Array<string>,
) => {
  const flattenedData = flattenObject(data);
  for (let [key, value] of Object.entries(flattenedData)) {
    if (scopeKeys === undefined || scopeKeys?.includes(key)) {
      if (
        String(value).match(
          new RegExp(`${escapeRegExp(String(criteria))}`, 'i'),
        )
      )
        return true;
    }
  }
  return false;
};
