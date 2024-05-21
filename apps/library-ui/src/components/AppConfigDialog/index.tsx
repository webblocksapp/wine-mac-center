import {
  Body1,
  Box,
  Button,
  Dialog,
  DialogProps,
  Grid,
  Stack,
} from 'reactjs-ui-core';
import { TextField, Checkbox, useForm } from 'reactjs-ui-form-fields';
import { WineEnginesSelect } from '@components';
import { useSchema } from './useSchema';

export interface AppConfigDialogProps extends DialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppConfigDialog: React.FC<AppConfigDialogProps> = ({
  setOpen,
  ...rest
}) => {
  const schema = useSchema();
  const form = useForm(schema);

  const submit = () => {
    form.reset();
  };

  return (
    <Dialog disableBackdropClick fullWidth maxWidth="md" {...rest}>
      <form
        onSubmit={form.handleSubmit(submit)}
        style={{ display: 'contents' }}
      >
        <Stack p={2} spacing={2} bgcolor="secondary.main">
          <Body1 fontWeight={500}>Create Application</Body1>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  control={form.control}
                  name="name"
                  label="Application Name"
                />
              </Grid>
              <Grid item xs={12}>
                <WineEnginesSelect
                  control={form.control}
                  name="engineVersion"
                />
              </Grid>
              <Grid item xs={12}>
                <Checkbox
                  control={form.control}
                  name="dxvkEnabled"
                  label="Enable DXVK"
                />
              </Grid>
            </Grid>
          </Box>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              type="submit"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
};
