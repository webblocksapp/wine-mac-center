import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { createWineApp, WineApp } from 'neu-wine-api';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogProps, Grid, H6, Icon } from 'reactjs-ui-core';

export interface UpdateAppConfigDialogProps extends DialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  appName: string;
}

export const UpdateAppConfigDialog: React.FC<UpdateAppConfigDialogProps> = ({
  setOpen,
  appName,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [wineApp, setWineApp] = useState<WineApp>();
  const options = [
    {
      label: 'Wine Config',
      icon: Cog6ToothIcon,
      method: () => {
        setLoading(true);
        wineApp?.winecfg({
          onExit: () => {
            setLoading(false);
          },
        });
      },
    },
  ];

  useEffect(() => {
    (async () => {
      setWineApp(await createWineApp(appName));
    })();
  }, []);

  return (
    <Dialog disableBackdropClick fullWidth maxWidth="md" {...rest}>
      <Grid p={2} container bgcolor="secondary.main" spacing={3}>
        {options.map((item) => (
          <Grid item xs={6}>
            <Button
              disabled={wineApp === undefined || loading}
              color="secondary"
              sx={{
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              }}
              fullWidth
              onClick={() => item.method?.()}
            >
              <Icon size={34} render={item.icon} pr={1} />
              <H6>{item.label}</H6>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Dialog>
  );
};
