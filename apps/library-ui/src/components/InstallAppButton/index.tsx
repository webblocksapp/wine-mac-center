import { InstallIcon } from '@assets/icons';
import { Button, Icon } from '@reactjs-ui/core';

export const InstallAppButton: React.FC = () => {
  return (
    <Button
      disableElevation={false}
      sx={{ borderRadius: 2 }}
      title="Install App"
      equalSize={40}
      color="secondary"
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
