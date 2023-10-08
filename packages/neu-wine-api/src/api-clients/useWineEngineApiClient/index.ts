import { filesystem } from '@neutralinojs/lib';
import { useWine } from '@utils';

export const useWineEngineApiClient = () => {
  const wine = useWine();
  const mapResponse = (response: filesystem.DirectoryEntry[]) => {
    return response
      .filter((item) => item.type === 'FILE' && item.entry !== '.DS_Store')
      .map((item) => item.entry.replace(/.tar.7z$/, ''));
  };

  const list = async () => mapResponse(await wine.listWineEngines());

  return { list };
};
