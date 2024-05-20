import { Button, ButtonProps, Icon } from 'reactjs-ui-core';
import { PlayIcon } from '@assets/icons';

export interface RunAppButtonProps extends ButtonProps {
  appConfigId?: string;
}

export const RunAppButton: React.FC<RunAppButtonProps> = ({
  appConfigId,
  onClick: onClickProp,
  ...rest
}) => {
  return (
    <Button
      disableElevation={false}
      sx={{ borderRadius: 2 }}
      title="Run App"
      equalSize={40}
      color="secondary"
      {...rest}
    >
      <Icon size={24} color="text.primary" strokeWidth={2} render={PlayIcon} />
    </Button>
  );
};
