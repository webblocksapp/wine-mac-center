import { Sidebar } from '@components';
import { Box } from '@reactjs-ui/core';
import { Outlet } from 'react-router-dom';
import { SIDEBAR_MENU } from '@constants';

export const MainLayout: React.FC = () => {
  return (
    <Box display="grid" gridTemplateColumns="295px 1fr">
      <Sidebar bgcolor="secondary.main" menu={SIDEBAR_MENU} />
      <Box p={0.5}>
        <Outlet />
      </Box>
    </Box>
  );
};
