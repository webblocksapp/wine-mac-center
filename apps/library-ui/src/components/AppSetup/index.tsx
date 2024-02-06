import {
  useWineAppConfigModel,
  useWineEngineModel,
  useWinetrickModel,
} from '@models';
import { useEffect } from 'react';

export interface AppSetupProps {
  children?: React.ReactNode;
}

export const AppSetup: React.FC<AppSetupProps> = ({ children }) => {
  const wineAppConfigModel = useWineAppConfigModel();
  const winetrickModel = useWinetrickModel();
  const wineEngineModel = useWineEngineModel();

  const asyncSetup = () => {
    Promise.allSettled([
      wineAppConfigModel.listAll(),
      wineEngineModel.list(),
      winetrickModel.listAll(),
    ]);
  };

  useEffect(() => {
    asyncSetup();
  }, []);

  return <>{children}</>;
};
