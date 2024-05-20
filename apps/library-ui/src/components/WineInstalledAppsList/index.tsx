import React, { forwardRef, useEffect, useState } from 'react';
import {
  InstalledAppCard,
  SearchField,
  SortDirectionSelect,
} from '@components';
import { useWineInstalledAppModel } from '@models';
import { Button, SkeletonLoader, Stack } from 'reactjs-ui-core';
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

export const WineInstalledAppsList: React.FC = () => {
  const wineInstalledAppModel = useWineInstalledAppModel();
  const [filters, setFilters] = useState<
    Parameters<typeof wineInstalledAppModel.selectWineInstalledApps>[1]
  >({ criteria: '', order: 'asc' });
  const { loaders } = wineInstalledAppModel;
  const wineInstalledApps = useSelector((state: RootState) =>
    wineInstalledAppModel.selectWineInstalledApps(state, filters),
  );

  useEffect(() => {
    wineInstalledAppModel.listAll();
  }, []);

  return (
    <Stack display="grid" gridTemplateRows="auto 1fr" spacing={1}>
      <Stack
        direction="row"
        spacing={1}
        pt={2}
        px={3}
        justifyContent="space-between"
      >
        <Stack spacing={1} direction="row" width="100%" maxWidth={450}>
          <SearchField
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                criteria: event.currentTarget.value,
              }))
            }
          />
          <SortDirectionSelect
            value={filters?.order}
            onChange={(order) =>
              setFilters((prev) => ({
                ...prev,
                order,
              }))
            }
          />
        </Stack>
        <Stack>
          <Button sx={{ height: '100%' }} color="secondary">
            Create App
          </Button>
        </Stack>
      </Stack>
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
    </Stack>
  );
};
