import { RegeditIcon } from '@assets/icons';
import {
  Cog6ToothIcon,
  CommandLineIcon,
  RectangleStackIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';
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
    {
      label: 'Registry Editor',
      icon: RegeditIcon,
      method: () => {
        setLoading(true);
        wineApp?.regedit({
          onExit: () => {
            setLoading(false);
          },
        });
      },
    },
    {
      label: 'Task Manager',
      icon: RectangleStackIcon,
      method: () => {
        setLoading(true);
        wineApp?.taskmgr({
          onExit: () => {
            setLoading(false);
          },
        });
      },
    },
    {
      label: 'Command Line',
      icon: CommandLineIcon,
      method: () => {
        setLoading(true);
        wineApp?.cmd({
          onExit: () => {
            setLoading(false);
          },
        });
      },
    },
    {
      label: 'Control Panel',
      icon: WrenchScrewdriverIcon,
      method: () => {
        setLoading(true);
        wineApp?.control({
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
        {options.map((item, index) => (
          <Grid key={index} item xs={6}>
            <Button
              disabled={wineApp === undefined || loading}
              color="secondary"
              sx={{
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              }}
              fullWidth
              onClick={() => item.method?.()}
            >
              <Icon strokeWidth={0} size={34} render={item.icon} pr={1} />
              <H6>{item.label}</H6>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Dialog>
  );
};
