export const writeFile = async (path: string, data: string) => {
  return window.api.writeFile(path, data);
};
