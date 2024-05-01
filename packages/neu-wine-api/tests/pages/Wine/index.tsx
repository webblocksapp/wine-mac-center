import { ScaffoldApp } from './ScaffoldApp';
import { ExtractEngine } from './ExtractEngine';
import { Wineboot } from './Wineboot';
import { EnableDxvk } from './EnableDxvk';
import { Winetrick } from './Winetrick';
import { RunExe } from './RunExe';
import { BundleApp } from './BundleApp';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { WineApp } from '@interfaces';
import { InitApp } from './InitApp';
import { WineCfg } from './WineCfg';
import { SetSetupExe } from './SetSetupExe';
import { DownloadEngine } from './DownloadEngine';

export const WineAppContext = createContext<{
  wineApp: WineApp;
  setWineApp: Dispatch<SetStateAction<WineApp>>;
}>({} as any);

export const useWineAppContext = () => useContext(WineAppContext);

export const Wine: React.FC = () => {
  const [wineApp, setWineApp] = useState<WineApp>(null as any);

  return (
    <div>
      <WineAppContext.Provider value={{ wineApp, setWineApp }}>
        {wineApp ? (
          <>
            <ScaffoldApp />
            <DownloadEngine />
            <ExtractEngine />
            <Wineboot />
            <EnableDxvk />
            <Winetrick />
            <SetSetupExe />
            <RunExe />
            <BundleApp />
            <WineCfg />
          </>
        ) : (
          <InitApp />
        )}
      </WineAppContext.Provider>
    </div>
  );
};
