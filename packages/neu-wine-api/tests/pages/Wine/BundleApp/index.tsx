import { useEffect, useState } from 'react';
import { Code, Select } from '@@components';
import { useWineAppContext } from '..';

export const BundleApp: React.FC = () => {
  const { wineApp } = useWineAppContext();
  const [executables, setExecutables] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [exePath, setExePath] = useState('');
  const [data, setData] = useState<any>();

  const bundleApp = async () => {
    setLoading(true);
    await wineApp.bundleApp(
      { exePath },
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
      (await wineApp.listAppExecutables()).map((item) => ({
        value: item.path,
        label: item.name,
      }))
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
