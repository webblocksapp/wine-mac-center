import { AppCard } from '@components';
import { useWineAppModel, useWineAppPipelineModel } from '@models';
import { Box, SkeletonLoader } from '@reactjs-ui/core';
import { array } from '@utils';
import { useSelector } from 'react-redux';

export const Home: React.FC = () => {
  const wineAppModel = useWineAppModel();
  const wineAppPipeline = useWineAppPipelineModel();
  const { loaders } = wineAppModel;
  const { wineApps } = useSelector(wineAppModel.selectWineAppState);

  const wineAppPipelines = useSelector(wineAppPipeline.selectWineAppPipelines);

  return (
    <SkeletonLoader loading={loaders.listingAll}>
      <Box display="grid" p={2}>
        {array(wineApps, {
          skeleton: { loading: loaders.listingAll, length: 6 },
        }).map((item) => (
          <AppCard key={item.id} appId={item.id} />
        ))}
        {JSON.stringify(wineAppPipelines)}
      </Box>
    </SkeletonLoader>
  );
};
