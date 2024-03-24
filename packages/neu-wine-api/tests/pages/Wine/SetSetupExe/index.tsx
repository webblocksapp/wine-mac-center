import { useState } from 'react';
import { useWineAppContext } from '..';

export const SetSetupExe: React.FC = () => {
  const { wineApp } = useWineAppContext();
  const [loading, setLoading] = useState(false);

  const setSetupExe = async () => {
    setLoading(true);
    await wineApp.setSetupExe([
      'https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe',
    ]);
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ marginBottom: 10 }}>
        <h3>Set Setup Exe</h3>
        <hr />
      </div>
      <button disabled={loading} onClick={setSetupExe}>
        {loading ? 'Downloading' : 'Download'} Setup Exe
      </button>
    </div>
  );
};
