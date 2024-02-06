export const array = <T extends Array<unknown>>(
  data: T | undefined,
  options: {
    skeleton: { length: number; data?: Partial<T[0]>; loading?: boolean };
  }
): T => {
  const skeletonArray = [];
  if (options.skeleton.loading && (data === undefined || data.length === 0)) {
    for (let i = 0; i < options.skeleton.length; i++) {
      skeletonArray.push((options.skeleton.data || { id: i }) as Partial<T[0]>);
    }
    return skeletonArray as T;
  } else {
    return (data || []) as T;
  }
};
