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
import { FileInput, WineEnginesSelect, WinetricksSelector } from '@components';
import { useWineAppPipelineModel } from '@models';
import { v4 as uuid } from 'uuid';
import { FormSchema, useSchema } from './useSchema';

export interface AppConfigDialogProps extends DialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppConfigDialog: React.FC<AppConfigDialogProps> = ({
  setOpen,
  ...rest
}) => {
  const schema = useSchema();
  const form = useForm(schema);
  const wineAppPipelineModel = useWineAppPipelineModel();

  const submit = async (data: FormSchema) => {
    const { name, dxvkEnabled, engineVersion } = data;
    wineAppPipelineModel.runWineAppPipeline({
      id: uuid(),
      name,
      dxvkEnabled,
      engineVersion,
      iconFile: await data.iconFile.arrayBuffer(),
    });
    form.reset();
    setOpen(false);
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
                  autoComplete="off"
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
                <FileInput
                  noSelectedFileLabel="Select Icon"
                  selectedFileLabel="Change Icon"
                  control={form.control}
                  name="iconFile"
                  accept="image/png"
                />
              </Grid>
              <Grid item xs={4}>
                <Checkbox
                  control={form.control}
                  name="dxvkEnabled"
                  label="Enable DXVK"
                />
              </Grid>
              <Grid item xs={4}>
                <Checkbox
                  control={form.control}
                  name="useWinetricks"
                  label="Winetricks"
                />
              </Grid>
              {form.watch('useWinetricks') ? (
                <Grid item xs={12}>
                  <WinetricksSelector
                    control={form.control}
                    name="winetricks"
                  />
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
          </Box>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button color="primary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button disabled={form.isInvalid} type="submit" color="primary">
              Create
            </Button>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
};
