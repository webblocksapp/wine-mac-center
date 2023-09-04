import { RouteObject } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Help } from '../pages/Winetricks/Help';

export const routes: RouteObject[] = [
  {
    path: 'winetricks',
    element: (
      <MainLayout
        headerText="Winetricks"
        menu={[{ text: 'Help', route: 'help' }]}
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
    ],
  },
];
