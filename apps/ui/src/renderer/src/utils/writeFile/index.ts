/**
 * Write app config.json in disk.
 */
export const writeFile = async (path: string, data: string) => {
  const rest: [any, any] = [undefined, undefined];
  return window.api.writeFile(path, data, ...rest);
};
