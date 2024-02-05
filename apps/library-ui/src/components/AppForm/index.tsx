import { Body1, Grid, Select, Stack, TextField } from '@reactjs-ui/core';

export const AppForm: React.FC = () => {
  return (
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
  );
};
