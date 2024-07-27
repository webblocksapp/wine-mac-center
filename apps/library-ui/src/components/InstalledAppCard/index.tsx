import { Box, Button, Card, CardProps, Icon, Image } from 'reactjs-ui-core';
import { UpdateAppConfigDialog } from '@components';
import { useWineAppModel, useWineInstalledAppModel } from '@models';
import { useSelector } from 'react-redux';
import { RootState } from '@interfaces';
import { useEffect, useState } from 'react';
import { getAppArtwork } from '@utils';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

export interface InstalledAppCardProps extends CardProps {
  appId?: string;
}

export const InstalledAppCard: React.FC<InstalledAppCardProps> = ({
  appId,
  ...rest
}) => {
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const wineInstalledAppModel = useWineInstalledAppModel();
  const wineAppModel = useWineAppModel();
  const installedWineApp = useSelector((state: RootState) =>
    wineInstalledAppModel.selectWineInstalledApp(state, appId),
  );
  const wineApp = useSelector((state: RootState) =>
    wineAppModel.selectWineApp(state, installedWineApp?.configId),
  );
  const [artWorkSrc, setArtWorkSrc] = useState(wineApp?.imgSrc);

  useEffect(() => {
    (async () => {
      wineApp?.imgSrc === undefined &&
        setArtWorkSrc(await getAppArtwork(installedWineApp?.appPath));
    })();
  }, []);

  return (
    <>
      <Card sx={{ width: 200, height: 300, borderRadius: 2 }} {...rest}>
        <Box
          height="100%"
          width="100%"
          p={1}
          display="grid"
          gridTemplateRows="230px 40px"
          rowGap={'10px'}
        >
          <Image
            src={artWorkSrc}
            height="100%"
            width="100%"
            style={{
              objectFit: 'cover',
              maxWidth: '100%',
              borderRadius: 12,
            }}
          />
          <Box display="flex" justifyContent="end">
            <Button
              sx={{ borderRadius: 2 }}
              title="Configure App"
              equalSize={40}
              color="secondary"
              onClick={() => setShowConfigDialog(true)}
            >
              <Icon render={Cog6ToothIcon} />
            </Button>
          </Box>
        </Box>
      </Card>
      <UpdateAppConfigDialog
        appName={installedWineApp?.realAppName || ''}
        open={showConfigDialog}
        setOpen={setShowConfigDialog}
      />
    </>
  );
};
