import { filesystem } from '@neutralinojs/lib';
import { createWine } from '@utils';
import { useMemo } from 'react';

export const useWineEngineApiClient = () => {
  const wine = useMemo(() => createWine(), []);
  const mapResponse = (response: filesystem.DirectoryEntry[]) => {
    return response
      .filter((item) => item.type === 'FILE' && item.entry !== '.DS_Store')
      .map((item) => item.entry.replace(/.tar.7z$/, ''));
  };

  const list = async () => mapResponse(await wine.listWineEngines());

  return { list };
};
