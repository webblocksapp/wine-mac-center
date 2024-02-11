import { AppCard } from '@components';
import { useWineAppModel } from '@models';
import { Box, SkeletonLoader } from '@reactjs-ui/core';
import { array } from '@utils';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Home: React.FC = () => {
  const wineAppModel = useWineAppModel();
  const { loaders } = wineAppModel;
  const { wineApps } = useSelector(wineAppModel.selectWineAppState);

  useEffect(() => {
    wineAppModel.listAll();
  }, []);

  return (
    <SkeletonLoader loading={loaders.listingAll}>
      <Box display="grid" p={2}>
        {array(wineApps, {
          skeleton: { loading: loaders.listingAll, length: 6 },
        }).map((item) => (
          <AppCard key={item.id} appId={item.id} />
        ))}
      </Box>
    </SkeletonLoader>
  );
};
