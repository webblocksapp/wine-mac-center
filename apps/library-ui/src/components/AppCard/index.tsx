import { Box, Card, CardProps, Image } from '@reactjs-ui/core';
import { InstallAppButton } from '@components';
import { useWineAppConfigModel } from '@models';
import { useSelector } from 'react-redux';
import { RootState } from '@interfaces';

export interface AppCardProps extends CardProps {
  appId?: string;
}

export const AppCard: React.FC<AppCardProps> = ({ appId, ...rest }) => {
  const wineAppConfigModel = useWineAppConfigModel();
  const wineAppConfig = useSelector((state: RootState) =>
    wineAppConfigModel.selectWineAppConfig(state, appId)
  );

  return (
    <Card sx={{ width: 200, height: 300, borderRadius: 2 }} {...rest}>
      <Box
        height="100%"
        width="100%"
        p={1}
        display="grid"
        gridTemplateRows="1fr 40px"
        rowGap={'10px'}
      >
        <Image
          src={wineAppConfig.imgSrc}
          height="100%"
          style={{
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: 12,
          }}
        />
        <Box display="flex" justifyContent="end">
          <InstallAppButton appId={wineAppConfig.id} />
        </Box>
      </Box>
    </Card>
  );
};
