import { Button, ButtonProps, Icon } from 'reactjs-ui-core';
import { PlayIcon, XCircleIcon } from '@assets/icons';
import { useWineInstalledAppModel } from '@models';
import { useSelector } from 'react-redux';
import { RootState } from '@interfaces';

export interface RunAppButtonProps extends ButtonProps {
  appId?: string;
}

export const RunAppButton: React.FC<RunAppButtonProps> = ({
  appId,
  onClick: onClickProp,
  ...rest
}) => {
  const wineInstalledAppModel = useWineInstalledAppModel();
  const wineInstalledApp = useSelector((state: RootState) =>
    wineInstalledAppModel.selectWineInstalledApp(state, appId),
  );
  const appIsOpened = Boolean(wineInstalledApp?.pid);

  const onClick: RunAppButtonProps['onClick'] = (event) => {
    appIsOpened
      ? wineInstalledAppModel.killApp(appId)
      : wineInstalledAppModel.runApp(appId);
    onClickProp?.(event);
  };

  return (
    <Button
      disableElevation={false}
      sx={{ borderRadius: 2 }}
      title="Run App"
      equalSize={40}
      color="secondary"
      onClick={onClick}
      {...rest}
    >
      <Icon
        size={24}
        color="text.primary"
        strokeWidth={2}
        render={appIsOpened ? XCircleIcon : PlayIcon}
      />
    </Button>
  );
};
