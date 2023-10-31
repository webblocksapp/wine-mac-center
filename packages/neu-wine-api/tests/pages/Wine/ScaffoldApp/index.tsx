import { Code, Input } from '@@components';
import { useState } from 'react';
import { useWineAppContext } from '..';

export const ScaffoldApp: React.FC = () => {
  const { wineApp } = useWineAppContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const scaffoldApp = async () => {
    setLoading(true);
    await wineApp.scaffold({
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
        <h3>Scaffold App</h3>
        <hr />
      </div>
      <Input
        readOnly
        label="Application name"
        value={wineApp.getAppConfig().name}
      />
      <Input
        readOnly
        label="Application path"
        value={wineApp.getWineEnv().WINE_APP_PATH}
      />
      <Input
        readOnly
        label="Application Contents path"
        value={wineApp.getWineEnv().WINE_APP_CONTENTS_PATH}
      />
      <button disabled={loading} onClick={scaffoldApp}>
        {loading ? 'Scaffolding' : 'Scaffold'} App
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
