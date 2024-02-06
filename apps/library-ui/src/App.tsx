import { routes } from '@routes';
import { useRoutes } from 'react-router-dom';
import { useWineAppConfigModel } from '@models';

export const App = () => {
  const x = useWineAppConfigModel();
  x.listAll();
  return useRoutes(routes);
};
