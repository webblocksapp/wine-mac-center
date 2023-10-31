import { useState } from 'react';
import { Code, useWineContext } from '@@components';

export const EnableDxvk: React.FC = () => {
  const { wine } = useWineContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const enableDxvk = async () => {
    setLoading(true);
    await wine.enableDxvk({
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
        <h3>EnableDxvk</h3>
        <hr />
      </div>
      <button disabled={loading} onClick={enableDxvk}>
        EnableDxvk
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
