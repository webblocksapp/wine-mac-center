import { useState } from 'react';
import { useWineContext } from '..';
import { Code } from '@@components';

export const BundleApp: React.FC = () => {
  const { wine, appName } = useWineContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const bundleApp = async () => {
    setLoading(true);
    await wine.bundleApp(
      { WINE_APP_NAME: appName },
      {
        onStdOut: (data) => {
          setData(data);
        },
        onStdErr: (data) => {
          setData(data);
        },
      }
    );
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Bundle App</h3>
        <hr />
      </div>
      <button disabled={loading} onClick={bundleApp}>
        Bundle App
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
