import { AppCard } from '@components';
import { useWineAppConfigModel } from '@models';
import { Box, SkeletonLoader } from '@reactjs-ui/core';
import { array } from '@utils';
import { useSelector } from 'react-redux';

export const Home: React.FC = () => {
  const wineAppConfigModel = useWineAppConfigModel();
  const { wineAppsConfigs, loaders } = useSelector(
    wineAppConfigModel.selectWineAppConfigState
  );

  return (
    <SkeletonLoader loading={loaders.listingAll}>
      <Box display="grid" p={2}>
        {array(wineAppsConfigs, {
          skeleton: { loading: loaders.listingAll, length: 6 },
        }).map((item) => (
          <AppCard key={item.id} appId={item.id} />
        ))}
      </Box>
    </SkeletonLoader>
  );
};
