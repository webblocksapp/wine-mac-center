import { useState } from 'react';
import { Code, WineEnginesSelect, useWineContext } from '@@components';

export const ExtractEngine: React.FC = () => {
  const { wine, appName, engine, setEngine } = useWineContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const extractEngine = async () => {
    setLoading(true);
    await wine.extractEngine(
      { WINE_APP_NAME: appName, WINE_ENGINE_VERSION: engine },
      {
        onStdOut: (data) => {
          console.log(data);
          setData(data);
        },
        onStdErr: (data) => {
          console.log(data);
          setData(data);
        },
      }
    );
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Extract Engine</h3>
        <hr />
      </div>
      <WineEnginesSelect
        disabled={loading}
        value={engine}
        onInput={(event) => setEngine(event.currentTarget.value)}
      />
      <button disabled={loading || !Boolean(engine)} onClick={extractEngine}>
        {loading ? 'Extracting' : 'Extract'} Engine
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
