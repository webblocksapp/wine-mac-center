import { useState } from 'react';
import { Code, WineEnginesSelect } from '@@components';
import { useWineAppContext } from '..';

export const ExtractEngine: React.FC = () => {
  const { wineApp } = useWineAppContext();
  const [engineVersion, setEngineVersion] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const extractEngine = async () => {
    setLoading(true);
    await wineApp.extractEngine(engineVersion, {
      onStdOut: (data) => {
        console.log(data);
        setData(data);
      },
      onStdErr: (data) => {
        console.log(data);
        setData(data);
      },
    });
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Extract Engine</h3>
        <hr />
      </div>
      <WineEnginesSelect
        wineApp={wineApp}
        disabled={loading}
        value={engineVersion}
        onInput={(event) => setEngineVersion(event.currentTarget.value)}
      />
      <button
        disabled={loading || !Boolean(engineVersion)}
        onClick={extractEngine}
      >
        {loading ? 'Extracting' : 'Extract'} Engine
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
