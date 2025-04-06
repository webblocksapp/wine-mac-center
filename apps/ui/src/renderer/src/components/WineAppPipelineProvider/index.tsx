import { AppPipelineDialog } from '@components/AppPipelineDialog';
import { withWineAppPipelineProvider } from '@hocs/withWineAppPipelineProvider';
import { RootState } from '@interfaces/RootState';
import { useWineAppPipelineModel } from '@models/useWineAppPipelineModel';
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
      wineAppPipelineModel.selectWineAppPipelineStatus(state)
    );

    useEffect(() => {
      setOpen(Boolean(pipeline?.pipelineId));
    }, [pipeline?.pipelineId]);

    return (
      <>
        <AppPipelineDialog open={open} />
        {children}
      </>
    );
  });
