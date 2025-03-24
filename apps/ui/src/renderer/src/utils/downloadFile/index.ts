export const downloadFile = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image, status code: ${response.status}`);
  }

  return response.arrayBuffer();
};
