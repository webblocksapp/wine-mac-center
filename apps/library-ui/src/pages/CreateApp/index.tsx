import { AppForm } from '@components';
import { Box, Card } from '@reactjs-ui/core';

export const CreateApp: React.FC = () => {
  return (
    <Box p={3}>
      <Card sx={{ maxWidth: 650, margin: 'auto' }}>
        <AppForm />
      </Card>
    </Box>
  );
};
