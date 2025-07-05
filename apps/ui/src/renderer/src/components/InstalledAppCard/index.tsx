import { Body1, Box, Button, Card, CardProps, Icon, Image } from 'reactjs-ui-core';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { UpdateAppConfigDialog } from '@components/UpdateAppConfigDialog';
import { RootState } from '@interfaces/RootState';
import { useWineAppModel } from '@models/useWineAppModel';
import { useWineInstalledAppModel } from '@models/useWineInstalledAppModel';
import { getAppArtwork } from '@utils/getAppArtwork';
import defaultArtwork from '@assets/imgs/header.jpg';

export interface InstalledAppCardProps extends CardProps {
  appId?: string;
}

export const InstalledAppCard: React.FC<InstalledAppCardProps> = ({ appId, ...rest }) => {
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const wineInstalledAppModel = useWineInstalledAppModel();
  const wineAppModel = useWineAppModel();
  const installedWineApp = useSelector((state: RootState) =>
    wineInstalledAppModel.selectWineInstalledApp(state, appId)
  );
  const wineApp = useSelector((state: RootState) =>
    wineAppModel.selectWineApp(state, installedWineApp?.configId)
  );
  const [artWorkSrc, setArtWorkSrc] = useState(wineApp?.imgSrc);
  const [noArtWork, setNoArtWork] = useState(false);

  useEffect(() => {
    (async () => {
      if (wineApp?.imgSrc === undefined) {
        const artWork = await getAppArtwork(installedWineApp?.appPath);
        setNoArtWork(!artWork);
        setArtWorkSrc(artWork || defaultArtwork);
      }
    })();
  }, []);

  return (
    <Card sx={{ width: 200, height: 300, borderRadius: 2 }} {...rest}>
      <Box
        height="100%"
        width="100%"
        p={1}
        display="grid"
        gridTemplateRows="230px 40px"
        rowGap={'10px'}
      >
        <Box position="relative">
          <Image
            src={artWorkSrc}
            height="100%"
            width="100%"
            style={{
              objectFit: 'cover',
              maxWidth: '100%',
              borderRadius: 12
            }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {noArtWork ? (
              <Body1 textAlign="center" p={1} fontWeight={500}>
                {installedWineApp?.realAppName}
              </Body1>
            ) : (
              <></>
            )}
          </Box>
        </Box>
        <Box display="flex" justifyContent="end">
          <Button
            sx={{ borderRadius: 2 }}
            equalSize={40}
            color="secondary"
            onClick={() => setShowConfigDialog(true)}
            title="Configure App"
          >
            <Icon render={Cog6ToothIcon} />
          </Button>
        </Box>
        <UpdateAppConfigDialog
          appName={installedWineApp?.realAppName || ''}
          open={showConfigDialog}
          setOpen={setShowConfigDialog}
        />
      </Box>
    </Card>
  );
};
