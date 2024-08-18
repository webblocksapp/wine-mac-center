import { filesystem } from '@neutralinojs/lib';

export const getAppArtwork = async (appPath = '') => {
  let url = '';
  try {
    const data = await filesystem.readBinaryFile(
      `${appPath}/Contents/Resources/header.jpeg`,
    );
    const blob = new Blob([data]);
    url = URL.createObjectURL(blob);
  } catch (_) {
    _;
  }

  return url;
};
