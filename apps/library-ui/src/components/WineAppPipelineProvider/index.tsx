import { AppPipelineDialog } from '@components';
import { withWineAppPipelineProvider } from '@hocs';
import { RootState } from '@interfaces';
import { useWineAppPipelineModel } from '@models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface WineAppPipelineProviderProps {
  children?: React.ReactNode;
}

export const WineAppPipelineProvider: React.FC<WineAppPipelineProviderProps> =
  withWineAppPipelineProvider(({ children }) => {
    const [open, setOpen] = useState(false);
    const wineAppPipelineModel = useWineAppPipelineModel();
    const pipeline = useSelector((state: RootState) =>
      wineAppPipelineModel.selectWineAppPipelineStatus(state),
    );

    useEffect(() => {
      pipeline?.pipelineId && setOpen(true);
    }, [pipeline?.pipelineId]);

    return (
      <>
        <AppPipelineDialog open={open} />
        {children}
      </>
    );
  });
