export const parseJSON = <TData extends { [key: string]: any }>(
  data?: string,
): TData | undefined => {
  let result: TData | undefined;
  try {
    result = data ? JSON.parse(data) : undefined;
  } catch (_) {
    _;
  }

  return result;
};
