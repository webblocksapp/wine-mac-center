import { useMemo } from 'react';
import { NeutralinoCurl } from '@utils';

export const Curl: React.FC = () => {
  const CURL = useMemo(() => {
    return new NeutralinoCurl({ debug: true });
  }, []);

  const download = async () => {
    try {
      await CURL.download(
        'https://raw.githubusercontent.com/webblocksapp/wine-mac-center/master/packages/wine-apps-configs/src/downloadables/setup-executables/SteamSetup.exe',
        '/Users/mauriver/Downloads/SteamSetup.exe',
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={download}>Download</button>
    </div>
  );
};
