export const handleError = (error: unknown) => {
  console.error(error);
  if (error instanceof Error) {
    return error.message;
  } else {
    return 'An unknown error ocurred.';
  }
};
