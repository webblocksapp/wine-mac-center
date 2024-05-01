import { useState } from 'react';
import { Code } from '@@components';
import { useWineAppContext } from '..';
import { ENGINES_URLS } from '@@constants';

export const DownloadEngine: React.FC = () => {
  const { wineApp } = useWineAppContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const downloadEngine = async () => {
    const ENGINE_VERSION = 'WS11WineCX64Bit23.6.0';

    setLoading(true);
    await wineApp.downloadWineEngine(
      ENGINES_URLS[ENGINE_VERSION],
      ENGINE_VERSION,
      {
        onStdOut: (data) => {
          console.log(data);
          setData(data);
        },
        onStdErr: (data) => {
          console.log(data);
          setData(data);
        },
      },
    );
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Download Engine</h3>
        <hr />
      </div>
      <button disabled={loading} onClick={downloadEngine}>
        {loading ? 'Downloading' : 'Download'} Engine
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
