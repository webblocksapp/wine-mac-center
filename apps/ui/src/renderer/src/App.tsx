import { routes } from '@routes';
import { useRoutes } from 'react-router-dom';

export const App = () => {
  //Fix: Outlet not working https://github.com/remix-run/react-router/issues/11480
  return useRoutes(routes);
};
