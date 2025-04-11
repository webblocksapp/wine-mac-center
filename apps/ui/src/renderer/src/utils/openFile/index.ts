import { readBinaryFile } from '@utils/readBinaryFile';
import { dialog } from 'electron';

export const openFile = async (
  title?: string,
  options?: Electron.OpenDialogOptions & { errorMessage?: string }
) => {
  let fileName = '';
  let file: File | undefined = undefined;
  let errorMessage = '';
  const { errorMessage: givenErrorMessage, ...restOptions } = options || {};

  try {
    const { filePaths } = await dialog.showOpenDialog({ title, ...restOptions });
    const [filePath] = filePaths;
    fileName = filePath?.split('/')?.pop() || '';
    const ext = fileName?.split('.')?.pop();
    const byteArray = await readBinaryFile(filePath);
    const blob = new Blob([byteArray], ext ? { type: `image/${ext}` } : undefined);
    file = new File([blob], fileName);
  } catch (_) {
    errorMessage = givenErrorMessage || 'No file found';
  }

  return { fileName, file, errorMessage };
};
