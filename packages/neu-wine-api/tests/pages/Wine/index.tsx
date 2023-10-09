import { createContext, useContext, useState } from 'react';
import { useWine } from '@@utils';
import { ScaffoldApp } from './ScaffoldApp';
import { ExtractEngine } from './ExtractEngine';
import { Wineboot } from './Wineboot';
import { EnableDxvk } from './EnableDxvk';
import { Winetrick } from './Winetrick';

export const WineContext = createContext<{
  wine: ReturnType<typeof useWine>;
  appName: string;
  setAppName: React.Dispatch<React.SetStateAction<string>>;
  engine: string;
  setEngine: React.Dispatch<React.SetStateAction<string>>;
}>({} as any);

export const useWineContext = () => useContext(WineContext);

export const Wine: React.FC = () => {
  const [appName, setAppName] = useState('Test App');
  const [engine, setEngine] = useState('');
  const wine = useWine();

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
      </div>
    </WineContext.Provider>
  );
};
