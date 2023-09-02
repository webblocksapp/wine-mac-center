import { Body1, Icon, MenuItem, MenuItemProps } from '@reactjs-ui/core';
import { MenuItem as MenuItemType } from '@interfaces';
import { styles } from './styles';

export interface SidebarItemProps extends MenuItemProps, MenuItemType {}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  text,
  icon,
  sx,
  ...rest
}) => {
  return (
    <MenuItem sx={styles({ sx })} {...rest}>
      {({ isActive }) => (
        <>
          {icon ? (
            <Icon
              color={`${isActive ? 'info.main' : 'text.secondary'}`}
              pr={1}
              render={icon}
            />
          ) : (
            <></>
          )}
          <Body1
            color={`${isActive ? 'text.primary' : 'text.secondary'}`}
            fontWeight={500}
          >
            {text}
          </Body1>
        </>
      )}
    </MenuItem>
  );
};
