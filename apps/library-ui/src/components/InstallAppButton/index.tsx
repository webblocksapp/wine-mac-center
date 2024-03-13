import { InstallIcon } from '@assets/icons';
import { AppPipeline, CircularProgress } from '@components';
import { useWineAppConfigModel, useWineAppPipelineModel } from '@models';
import {
  Button,
  ButtonProps,
  Icon,
  useDialogFactoryContext,
} from '@reactjs-ui/core';
import { RootState } from '@interfaces';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export interface InstallAppButtonProps extends ButtonProps {
  appId?: string;
}

export const InstallAppButton: React.FC<InstallAppButtonProps> = ({
  appId,
  onClick: onClickProp,
  ...rest
}) => {
  const wineAppConfigModel = useWineAppConfigModel();
  const wineAppPipelineModel = useWineAppPipelineModel();
  const pipeline = useSelector((state: RootState) =>
    wineAppPipelineModel.selectWineAppPipelineByAppId(state, appId),
  );
  const [loading, setLoading] = useState(false);
  const { createDialog } = useDialogFactoryContext();

  const onClick: InstallAppButtonProps['onClick'] = async (event) => {
    setLoading(true);
    await wineAppConfigModel.read(appId);
    await wineAppPipelineModel.runWineAppPipeline(appId);
    onClickProp?.(event);
    setLoading(false);
  };

  useEffect(() => {
    pipeline &&
      createDialog({
        template: <AppPipeline pipelineId={pipeline.pipelineId} />,
      });
  }, [pipeline?.pipelineId]);

  return (
    <Button
      disableElevation={false}
      sx={{ borderRadius: 2 }}
      title="Install App"
      equalSize={40}
      color="secondary"
      disabled={loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Icon
          size={24}
          color="text.primary"
          strokeWidth={2}
          render={InstallIcon}
        />
      )}
    </Button>
  );
};
