import { useWineAppModel, useWineEngineModel } from '@models';
import { useEffect } from 'react';

export interface AppSetupProps {
  children?: React.ReactNode;
}

export const AppSetup: React.FC<AppSetupProps> = ({ children }) => {
  const wineAppModel = useWineAppModel();
  const wineEngineModel = useWineEngineModel();

  const asyncSetup = () => {
    Promise.allSettled([wineAppModel.listAll(), wineEngineModel.list()]);
  };

  useEffect(() => {
    asyncSetup();
  }, []);

  return <>{children}</>;
};
