import { createContext, useContext, useState } from 'react';
import { ScaffoldApp } from './ScaffoldApp';
import { ExtractEngine } from './ExtractEngine';
import { Wineboot } from './Wineboot';
import { useWine } from '@@utils';
import { EnableDxvk } from './EnableDxvk';

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
      </div>
    </WineContext.Provider>
  );
};
