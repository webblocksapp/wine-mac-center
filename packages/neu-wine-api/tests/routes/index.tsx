import { RouteObject } from 'react-router-dom';
import { MainLayout } from '@@layouts';
import { Envs, Help, Home, Wine, ListDlls, WinePipeline, Curl } from '@@pages';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'curl',
    element: <Curl />,
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
          { text: 'List Dlls', route: 'list-dlls' },
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
        path: 'list-dlls',
        element: <ListDlls />,
      },
    ],
  },
  {
    path: 'wine',
    element: (
      <MainLayout
        headerText="Wine"
        menu={[
          { text: 'Overview', route: 'overview' },
          { text: 'Pipeline', route: 'pipeline' },
        ]}
      />
    ),
    children: [
      {
        index: true,
        element: <Wine />,
      },
      {
        path: 'overview',
        element: <Wine />,
      },
      {
        path: 'pipeline',
        element: <WinePipeline />,
      },
    ],
  },
];
