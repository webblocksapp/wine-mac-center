import { Code, Input } from '@@components';
import { useState } from 'react';
import { useWineContext } from '..';

export const ScaffoldApp: React.FC = () => {
  const { wine, appName, setAppName } = useWineContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const scaffoldApp = async () => {
    setLoading(true);
    await wine.scaffoldApp(
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
        <h3>Scaffold App</h3>
        <hr />
      </div>
      <Input
        disabled={loading}
        label="Application name"
        value={appName}
        onInput={(event) => setAppName(event.currentTarget.value)}
      />
      <Input
        readOnly
        disabled={loading}
        label="Application path"
        value={wine.getWineEnv().WINE_APP_PATH}
      />
      <Input
        readOnly
        disabled={loading}
        label="Application Contents path"
        value={wine.getWineEnv().WINE_APP_CONTENTS_PATH}
      />
      <button disabled={loading} onClick={scaffoldApp}>
        {loading ? 'Scaffolding' : 'Scaffold'} App
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
