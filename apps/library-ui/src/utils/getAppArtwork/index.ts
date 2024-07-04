import { filesystem } from '@neutralinojs/lib';

export const getAppArtwork = async (appPath = '') => {
  const data = await filesystem.readBinaryFile(
    `${appPath}/Contents/Resources/header.jpeg`,
  );
  const blob = new Blob([data]);
  return URL.createObjectURL(blob);
};
