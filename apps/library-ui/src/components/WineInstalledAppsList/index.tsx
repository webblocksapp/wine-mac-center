import React, { forwardRef, useEffect } from 'react';
import { InstalledAppCard } from '@components';
import { useWineInstalledAppModel } from '@models';
import { SkeletonLoader } from 'reactjs-ui-core';
import { useSelector } from 'react-redux';
import { VirtuosoGrid } from 'react-virtuoso';

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {}
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const List = forwardRef<HTMLDivElement, ListProps>(
  ({ style, children, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      style={{
        display: 'grid',
        gridAutoColumns: 'minmax(200px, auto)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridGap: '10px',
        padding: '10px',
        ...style,
      }}
    >
      {children}
    </div>
  ),
);

const Item: React.FC<ItemProps> = ({ style, children, ...rest }) => (
  <div
    {...rest}
    style={{
      padding: 12,
      display: 'flex',
      flex: 'none',
      alignContent: 'stretch',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

export const WineInstalledAppsList: React.FC = () => {
  const wineInstalledAppModel = useWineInstalledAppModel();
  const { loaders } = wineInstalledAppModel;
  const { wineInstalledApps } = useSelector(
    wineInstalledAppModel.selectWineInstalledAppState,
  );

  useEffect(() => {
    wineInstalledAppModel.listAll();
  }, []);

  return (
    <SkeletonLoader loading={loaders.listingAll}>
      <VirtuosoGrid
        style={{ height: '100%' }}
        data={wineInstalledApps}
        components={{ List, Item }}
        itemContent={(_, installedWineApp) => (
          <InstalledAppCard
            key={installedWineApp.id}
            appId={installedWineApp.id}
          />
        )}
      />
    </SkeletonLoader>
  );
};
