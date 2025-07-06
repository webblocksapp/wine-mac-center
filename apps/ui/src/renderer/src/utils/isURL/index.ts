export const isURL = (path: string): boolean => {
  try {
    const url = new URL(path);
    return Boolean(url.protocol) && Boolean(url.host);
  } catch {
    return false;
  }
};
