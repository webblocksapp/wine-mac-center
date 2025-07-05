import { Box } from 'reactjs-ui-core';
import { Outlet } from 'react-router-dom';

export const SimpleLayout: React.FC = () => {
  return (
    <Box display="grid" overflow="auto">
      <Outlet />
    </Box>
  );
};
