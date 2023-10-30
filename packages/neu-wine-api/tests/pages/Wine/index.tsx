import { createContext, useContext, useMemo, useState } from 'react';
import { createWine } from 'neu-wine-api';
import { ScaffoldApp } from './ScaffoldApp';
import { ExtractEngine } from './ExtractEngine';
import { Wineboot } from './Wineboot';
import { EnableDxvk } from './EnableDxvk';
import { Winetrick } from './Winetrick';
import { RunExe } from './RunExe';
import { BundleApp } from './BundleApp';

export const WineContext = createContext<{
  wine: ReturnType<typeof createWine>;
  appName: string;
  setAppName: React.Dispatch<React.SetStateAction<string>>;
  engine: string;
  setEngine: React.Dispatch<React.SetStateAction<string>>;
}>({} as any);

export const useWineContext = () => useContext(WineContext);

export const Wine: React.FC = () => {
  const [appName, setAppName] = useState('Test App');
  const [engine, setEngine] = useState('');
  const wine = useMemo(() => createWine(), []);

  return (
    <WineContext.Provider
      value={{ appName, setAppName, wine, engine, setEngine }}
    >
      <div>
        <ScaffoldApp />
        <ExtractEngine />
        <Wineboot />
        <EnableDxvk />
        <Winetrick />
        <RunExe />
        <BundleApp />
      </div>
    </WineContext.Provider>
  );
};
