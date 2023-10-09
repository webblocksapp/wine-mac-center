import { useState } from 'react';
import { useWineContext } from '..';
import { Code, Input } from '@@components';

export const Winetrick: React.FC = () => {
  const { wine, appName, setAppName } = useWineContext();
  const [loading, setLoading] = useState(false);
  const [trick, setTrick] = useState('');
  const [data, setData] = useState<any>();

  const winetrick = async () => {
    setLoading(true);
    await wine.winetrick({ WINE_APP_NAME: appName }, trick, {
      onStdOut: (data) => {
        setData(data);
      },
      onStdErr: (data) => {
        setData(data);
      },
    });
    setAppName(wine.getWineEnv().WINE_APP_NAME);
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Winetrick</h3>
        <hr />
      </div>
      <Input
        disabled={loading}
        label="Trick"
        value={trick}
        onInput={(event) => setTrick(event.currentTarget.value)}
      />
      <button disabled={loading || !Boolean(trick)} onClick={winetrick}>
        Winetrick
      </button>
      <Code label="Output" content={JSON.stringify(data, null, 2)} />
    </div>
  );
};
