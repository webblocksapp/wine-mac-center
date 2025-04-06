import { routes } from '@routes';
import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('home');
  }, []);

  //Fix: Outlet not working https://github.com/remix-run/react-router/issues/11480
  return useRoutes(routes);
};
