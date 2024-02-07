import { InstallIcon } from '@assets/icons';
import { RootState } from '@interfaces';
import { useWineAppConfigModel } from '@models';
import { Button, ButtonProps, Icon } from '@reactjs-ui/core';
import { useSelector } from 'react-redux';

export interface InstallAppButtonProps extends ButtonProps {
  appId?: string;
}

export const InstallAppButton: React.FC<InstallAppButtonProps> = ({
  appId,
  onClick: onClickProp,
  ...rest
}) => {
  const wineAppConfigModel = useWineAppConfigModel();
  const { loaders } = wineAppConfigModel;
  const wineAppConfig = useSelector((state: RootState) =>
    wineAppConfigModel.selectWineAppConfig(state, appId)
  );

  const onClick: InstallAppButtonProps['onClick'] = (event) => {
    wineAppConfigModel.read(wineAppConfig.id);
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
