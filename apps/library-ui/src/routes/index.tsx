import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@layouts';
import { Apps, CreateApp, Home, Settings, Tasks } from '@pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'apps', element: <Apps /> },
      { path: 'create-app', element: <CreateApp /> },
      { path: 'settings', element: <Settings /> },
      { path: 'tasks', element: <Tasks /> },
    ],
  },
];
