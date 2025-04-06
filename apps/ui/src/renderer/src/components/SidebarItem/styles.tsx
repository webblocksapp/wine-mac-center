import { SidebarItemProps } from '@components';

export const styles = ({
  sx,
}: Partial<SidebarItemProps>): SidebarItemProps['sx'] => ({
  paddingY: 1,
  borderRadius: 2,
  ...sx,
});
