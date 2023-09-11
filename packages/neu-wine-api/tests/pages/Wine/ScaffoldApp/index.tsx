import { Code, Input } from '@@components';
import { useWine } from '@@utils';
import { useState } from 'react';

export const ScaffoldApp: React.FC = () => {
  const wine = useWine();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const scaffoldApp = () => {
    wine.scaffoldApp({
      onStdOut: (data) => {
        setData(data);
      },
    });
  };

  return (
    <div>
      <Input disabled={loading} label="Application name" />
      <Input
        readOnly
        disabled={loading}
        label="Application path"
        value={wine.getWineEnv().WINE_APP_PATH}
      />
      <button disabled={loading} onClick={scaffoldApp}>
        {loading ? 'Scaffolding' : 'Scaffold'} App
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
