import { Sidebar } from '@components';
import { Box } from '@reactjs-ui/core';
import { Outlet } from 'react-router-dom';
import { SIDEBAR_MENU } from '@constants';

export const MainLayout: React.FC = () => {
  return (
    <Box display="grid" gridTemplateColumns="295px 1fr">
      <Sidebar
        pt={2}
        pb={1}
        px={2}
        bgcolor="secondary.main"
        menu={SIDEBAR_MENU}
      />
      <Box p={1}>
        <Outlet />
      </Box>
    </Box>
  );
};
