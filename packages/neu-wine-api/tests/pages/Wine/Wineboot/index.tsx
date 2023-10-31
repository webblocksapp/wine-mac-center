import { useState } from 'react';
import { Code, useWineContext } from '@@components';

export const Wineboot: React.FC = () => {
  const { wine, appName, setAppName } = useWineContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const wineboot = async () => {
    setLoading(true);
    await wine.wineboot(
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
    setAppName(wine.getWineEnv().WINE_APP_NAME);
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Wineboot</h3>
        <hr />
      </div>
      <button disabled={loading} onClick={wineboot}>
        Wineboot
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
