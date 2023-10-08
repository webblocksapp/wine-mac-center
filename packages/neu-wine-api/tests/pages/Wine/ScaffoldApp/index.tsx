import { Code, Input } from '@@components';
import { useWine } from '@@utils';
import { useState } from 'react';

export const ScaffoldApp: React.FC = () => {
  const wine = useWine();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [appName, setAppName] = useState('');

  const scaffoldApp = async () => {
    setLoading(true);
    await wine.scaffoldApp(
      {
        onStdOut: (data) => {
          console.log(data);
          setData(data);
        },
      },
      { env: { WINE_APP_NAME: appName } }
    );
    setLoading(false);
  };

  return (
    <div>
      <Input
        disabled={loading}
        label="Application name"
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
