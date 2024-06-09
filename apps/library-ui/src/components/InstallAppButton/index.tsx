import { InstallIcon } from '@assets/icons';
import { CircularProgress } from '@components';
import { useWineAppConfigModel, useWineAppPipelineModel } from '@models';
import { Button, ButtonProps, Icon } from 'reactjs-ui-core';

import { useState } from 'react';

export interface InstallAppButtonProps extends ButtonProps {
  appConfigId?: string;
}

export const InstallAppButton: React.FC<InstallAppButtonProps> = ({
  appConfigId,
  onClick: onClickProp,
  ...rest
}) => {
  const wineAppConfigModel = useWineAppConfigModel();
  const wineAppPipelineModel = useWineAppPipelineModel();
  const [loading, setLoading] = useState(false);

  const onClick: InstallAppButtonProps['onClick'] = async (event) => {
    setLoading(true);
    await wineAppConfigModel.read(appConfigId);
    await wineAppPipelineModel.runWineAppPipelineByAppConfigId(appConfigId);
    onClickProp?.(event);
    setLoading(false);
  };

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
