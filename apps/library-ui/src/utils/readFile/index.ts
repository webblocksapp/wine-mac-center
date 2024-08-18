import { filesystem, os } from '@neutralinojs/lib';

export const readFile = async (
  title?: string,
  options?: os.OpenDialogOptions & { errorMessage?: string },
) => {
  let fileName = '';
  let file: File | undefined = undefined;
  let errorMessage = '';
  const { errorMessage: givenErrorMessage, ...restOptions } = options || {};

  try {
    const [filePath] = await os.showOpenDialog(title, restOptions);
    fileName = filePath?.split('/')?.pop() || '';
    const ext = fileName?.split('.')?.pop();
    const byteArray = await filesystem.readBinaryFile(filePath);
    const blob = new Blob(
      [byteArray],
      ext ? { type: `image/${ext}` } : undefined,
    );
    file = new File([blob], fileName);
  } catch (_) {
    errorMessage = givenErrorMessage || 'No file found';
  }

  return { fileName, file, errorMessage };
};
