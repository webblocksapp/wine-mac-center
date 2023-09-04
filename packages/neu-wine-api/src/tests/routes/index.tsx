import { RouteObject } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Help, ListGames } from '../pages/Winetricks';

export const routes: RouteObject[] = [
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
];
