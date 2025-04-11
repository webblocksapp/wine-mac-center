export const writeBinaryFile = async (filePath: string, arrayBuffer: ArrayBuffer) =>
  window.api.writeBinaryFile(filePath, arrayBuffer);
