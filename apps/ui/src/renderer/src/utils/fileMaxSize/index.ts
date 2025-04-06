export const fileMaxSize = (value?: File, maxSize?: number) => {
  const size = value?.size || 0;
  return size <= (maxSize || 0) ? true : false;
};
