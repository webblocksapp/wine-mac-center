import { RegeditIcon } from '@assets/icons';
import {
  Cog6ToothIcon,
  CommandLineIcon,
  CpuChipIcon,
  RectangleStackIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Body1, Button, Grid, H6, Icon } from 'reactjs-ui-core';
import { ChangeWineEngineDialog } from '../ChangeWineEngineDialog';
import { WineApp } from '@interfaces/WineApp';
import { useParams } from 'react-router-dom';
import { createWineApp } from '@utils/createWineApp';

export const AppConfig: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showChangeWineEngineDialog, setShowChangeWineEngineDialog] = useState(false);
  const { realAppName, ...rest } = useParams();
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
          }
        });
      }
    },
    {
      label: 'Registry Editor',
      icon: RegeditIcon,
      method: () => {
        setLoading(true);
        wineApp?.regedit({
          onExit: () => {
            setLoading(false);
          }
        });
      }
    },
    {
      label: 'Task Manager',
      icon: RectangleStackIcon,
      method: () => {
        setLoading(true);
        wineApp?.taskmgr({
          onExit: () => {
            setLoading(false);
          }
        });
      }
    },
    {
      label: 'Command Line',
      icon: CommandLineIcon,
      method: () => {
        setLoading(true);
        wineApp?.cmd({
          onExit: () => {
            setLoading(false);
          }
        });
      }
    },
    {
      label: 'Control Panel',
      icon: WrenchScrewdriverIcon,
      method: () => {
        setLoading(true);
        wineApp?.control({
          onExit: () => {
            setLoading(false);
          }
        });
      }
    },
    {
      label: 'Change Engine',
      icon: CpuChipIcon,
      method: () => {
        setShowChangeWineEngineDialog(true);
      }
    }
  ];

  console.log(realAppName, rest);

  useEffect(() => {
    (async () => {
      realAppName && setWineApp(await createWineApp(realAppName));
    })();
  }, [realAppName]);

  return (
    <>
      <Grid p={2} container bgcolor="secondary.main" spacing={3}>
        <Grid xs={12} item>
          <Body1 fontWeight={500}>{realAppName}</Body1>
        </Grid>
        {options.map((item, index) => (
          <Grid key={index} item xs={6}>
            <Button
              disabled={wineApp === undefined || loading}
              color="secondary"
              sx={{
                border: (theme) => `1px solid ${theme.palette.primary.main}`
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
      <ChangeWineEngineDialog
        wineApp={wineApp}
        open={showChangeWineEngineDialog}
        setOpen={setShowChangeWineEngineDialog}
        onClose={() => {
          setShowChangeWineEngineDialog(false);
        }}
      />
    </>
  );
};
