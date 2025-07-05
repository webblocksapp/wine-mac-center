import { RegeditIcon } from '@assets/icons';
import {
  Cog6ToothIcon,
  CommandLineIcon,
  CpuChipIcon,
  RectangleStackIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import {
  Body1,
  Box,
  Button,
  ContentsArea,
  ContentsAreaHandle,
  ContentsClass,
  Grid,
  H6,
  Icon,
  TableOfContents
} from 'reactjs-ui-core';
import { ChangeWineEngineDialog } from '../ChangeWineEngineDialog';
import { WineApp } from '@interfaces/WineApp';
import { useNavigate, useParams } from 'react-router-dom';
import { createWineApp } from '@utils/createWineApp';
import { alpha } from '@mui/material';

export const AppConfig: React.FC = () => {
  const contentsAreaRef = useRef<ContentsAreaHandle>(null);
  const [loading, setLoading] = useState(false);
  const [showChangeWineEngineDialog, setShowChangeWineEngineDialog] = useState(false);
  const [wineApp, setWineApp] = useState<WineApp>();
  const { realAppName, ...rest } = useParams();
  const navigate = useNavigate();
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
    <Box display="grid" overflow="auto">
      <ContentsArea
        ref={contentsAreaRef}
        style={{
          height: '100%',
          display: 'grid',
          overflow: 'auto',
          gridTemplateRows: 'auto 1fr'
        }}
      >
        <Box>
          <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              boxShadow: (theme) => `inset 0 -1px ${theme.palette.secondary.main}`
            }}
          >
            <Body1 fontWeight={500}>{realAppName}</Body1>
            <Button color="secondary" onClick={() => navigate('/apps')}>
              Back
            </Button>
          </Box>
          <Box
            sx={{
              height: '1px',
              boxShadow: (theme) => `inset 0 1px ${theme.palette.primary.main}`
            }}
          ></Box>
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 220px" overflow="auto">
          <Box
            overflow="auto"
            display="grid"
            sx={{
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: (theme) => alpha(theme.palette?.secondary.dark, 0.3)
              }
            }}
          >
            <Box
              className={ContentsClass.ScrollableArea}
              display="grid"
              overflow="auto"
              pb={2}
              sx={{
                overflowX: 'hidden !important'
              }}
            >
              <Box height={5000}>
                <Grid p={2} container bgcolor="secondary.main" spacing={3}>
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
              </Box>
            </Box>
          </Box>
          <Box borderLeft={(theme) => `1px solid ${theme.palette.primary.main}`}>
            <TableOfContents pt={1} />
          </Box>
        </Box>
      </ContentsArea>
    </Box>
  );
};
