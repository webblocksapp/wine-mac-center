import { RouteObject } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { Envs, Help, Home, ListGames, Wine } from '../pages';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'os',
    element: (
      <MainLayout
        headerText="Os"
        menu={[{ text: 'Env variables', route: 'envs' }]}
      />
    ),
    children: [
      {
        index: true,
        element: <Envs />,
      },
    ],
  },
  {
    path: 'winetricks',
    element: (
      <MainLayout
        headerText="Winetricks"
        menu={[
          { text: 'Help', route: 'help' },
          { text: 'List Games', route: 'list-games' },
        ]}
      />
    ),
    children: [
      {
        index: true,
        element: <Help />,
      },
      {
        path: 'help',
        element: <Help />,
      },
      {
        path: 'list-games',
        element: <ListGames />,
      },
    ],
  },
  {
    path: 'wine',
    element: (
      <MainLayout
        headerText="Wine"
        menu={[{ text: 'Overview', route: 'overview' }]}
      />
    ),
    children: [
      {
        index: true,
        element: <Wine />,
      },
    ],
  },
];
