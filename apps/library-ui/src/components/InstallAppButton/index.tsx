import { InstallIcon } from '@assets/icons';
import { useWineAppConfigModel, useWineAppPipelineModel } from '@models';
import { Button, ButtonProps, Icon } from '@reactjs-ui/core';

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
  const { loaders } = wineAppConfigModel;

  const onClick: InstallAppButtonProps['onClick'] = async (event) => {
    await wineAppConfigModel.read(appId);
    await wineAppPipelineModel.runWineAppPipeline(appId);
    onClickProp?.(event);
  };

  return (
    <Button
      disableElevation={false}
      sx={{ borderRadius: 2 }}
      title="Install App"
      equalSize={40}
      color="secondary"
      disabled={loaders.reading}
      onClick={onClick}
      {...rest}
    >
      <Icon
        size={24}
        color="text.primary"
        strokeWidth={2}
        render={InstallIcon}
      />
    </Button>
  );
};
