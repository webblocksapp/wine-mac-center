import { useState } from 'react';
import { Code, Input } from '@@components';
import { useWineAppContext } from '..';

export const RunExe: React.FC = () => {
  const { wineApp } = useWineAppContext();
  const [loading, setLoading] = useState(false);
  const [exePath, setExePath] = useState('');
  const [data, setData] = useState<any>();

  const runExe = async () => {
    setLoading(true);
    await wineApp.runExe(exePath, {
      onStdOut: (data) => {
        setData(data);
      },
      onStdErr: (data) => {
        setData(data);
      },
    });
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>RunExe</h3>
        <hr />
      </div>
      <Input
        disabled={loading}
        label="Exe Path"
        value={exePath}
        onInput={(event) => setExePath(event.currentTarget.value)}
      />
      <button disabled={loading || !Boolean(exePath)} onClick={runExe}>
        RunExe
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
