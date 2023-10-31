import { Input } from '@@components';
import { useState } from 'react';
import { useWineAppContext } from '..';
import { createWineApp } from '@utils';

export const InitApp: React.FC = () => {
  const { setWineApp } = useWineAppContext();
  const [appName, setAppName] = useState('Test App');
  const [loading, setLoading] = useState(false);

  const start = async () => {
    setLoading(true);
    const wineApp = await createWineApp(appName);
    setWineApp(wineApp);
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Init Wine App</h3>
        <hr />
      </div>
      <Input
        disabled={loading}
        label="Application name"
        value={appName}
        onInput={(event) => setAppName(event.currentTarget.value)}
      />
      <button disabled={loading} onClick={start}>
        {loading ? 'Initializing' : 'Init'} App
      </button>
    </div>
  );
};
