import { useEffect, useState } from 'react';
import { useWineContext } from '..';
import { Code, Select } from '@@components';

export const BundleApp: React.FC = () => {
  const { wine, appName } = useWineContext();
  const [executables, setExecutables] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [exePath, setExePath] = useState('');
  const [data, setData] = useState<any>();

  const bundleApp = async () => {
    setLoading(true);
    await wine.bundleApp(
      { WINE_APP_NAME: appName, exePath },
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

  const listAppExecutables = async () => {
    setExecutables(
      (await wine.listAppExecutables({ WINE_APP_NAME: appName })).map(
        (item) => ({ value: item.path, label: item.name })
      )
    );
  };

  useEffect(() => {
    listAppExecutables();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Bundle App</h3>
        <hr />
      </div>
      <Select
        options={executables}
        onChange={(event) => setExePath(event.currentTarget.value)}
      />
      <button disabled={loading} onClick={bundleApp}>
        Bundle App
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
