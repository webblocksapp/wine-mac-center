import { Body1, Box, Card, Grid, Stack } from '@reactjs-ui/core';
import { TextField, Select } from '@reactjs-ui/form-fields';

export const CreateApp: React.FC = () => {
  return (
    <Box p={3}>
      <Card sx={{ maxWidth: 650, margin: 'auto' }}>
        <Stack p={2} spacing={3}>
          <Body1>Create App</Body1>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField label="Application Name" />
              </Grid>
              <Grid item xs={12}>
                <Select label="Wine Engine" />
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Card>
    </Box>
  );
};
