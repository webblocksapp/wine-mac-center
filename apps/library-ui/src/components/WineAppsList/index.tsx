import React, { forwardRef, useEffect, useState } from 'react';
import { AppCard, SearchField } from '@components';
import { useWineAppModel } from '@models';
import { Box, SkeletonLoader, Stack } from 'reactjs-ui-core';
import { useSelector } from 'react-redux';
import { VirtuosoGrid } from 'react-virtuoso';
import { RootState } from '@interfaces';

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

export const WineAppsList: React.FC = () => {
  const wineAppModel = useWineAppModel();
  const [filters, setFilters] = useState({ criteria: '' });
  const { loaders } = wineAppModel;
  const wineApps = useSelector((state: RootState) =>
    wineAppModel.selectWineApps(state, filters),
  );

  useEffect(() => {
    wineAppModel.listAll();
  }, []);

  return (
    <SkeletonLoader loading={loaders.listingAll}>
      <Stack display="grid" gridTemplateRows="auto 1fr" spacing={1}>
        <Stack direction="row" pt={2} px={3}>
          <Box width="100%" maxWidth={400}>
            <SearchField
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  criteria: event.currentTarget.value,
                }))
              }
            />
          </Box>
        </Stack>
        <VirtuosoGrid
          style={{ height: '100%' }}
          data={wineApps}
          components={{ List, Item }}
          itemContent={(_, wineApp) => (
            <AppCard
              key={wineApp.appConfigId}
              appConfigId={wineApp.appConfigId}
            />
          )}
        />
      </Stack>
    </SkeletonLoader>
  );
};
