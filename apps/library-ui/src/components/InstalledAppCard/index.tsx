import { Box, Card, CardProps, Image } from 'reactjs-ui-core';
import { RunAppButton } from '@components';
import { useWineAppModel, useWineInstalledAppModel } from '@models';
import { useSelector } from 'react-redux';
import { RootState } from '@interfaces';

export interface InstalledAppCardProps extends CardProps {
  appId?: string;
}

export const InstalledAppCard: React.FC<InstalledAppCardProps> = ({
  appId,
  ...rest
}) => {
  const wineInstalledAppModel = useWineInstalledAppModel();
  const wineAppModel = useWineAppModel();
  const installedWineApp = useSelector((state: RootState) =>
    wineInstalledAppModel.selectWineInstalledApp(state, appId),
  );
  const wineApp = useSelector((state: RootState) =>
    wineAppModel.selectWineApp(state, installedWineApp?.configId),
  );

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
        <Image
          src={wineApp?.imgSrc}
          height="100%"
          width="100%"
          style={{
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: 12,
          }}
        />
        <Box display="flex" justifyContent="end">
          <RunAppButton appConfigId={wineApp?.appConfigId} />
        </Box>
      </Box>
    </Card>
  );
};
