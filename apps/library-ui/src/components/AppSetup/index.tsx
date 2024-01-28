import { useWinetrickModel } from '@models';
import { useEffect } from 'react';

export interface AppSetupProps {
  children?: React.ReactNode;
}

export const AppSetup: React.FC<AppSetupProps> = ({ children }) => {
  const winetrickModel = useWinetrickModel();

  const asyncSetup = () => {
    Promise.allSettled([winetrickModel.listAll()]);
  };

  useEffect(() => {
    asyncSetup();
  }, []);

  return <>{children}</>;
};
