import { SidebarItemProps } from '@components/SidebarItem';

export const styles = ({ sx }: Partial<SidebarItemProps>): SidebarItemProps['sx'] => ({
  paddingY: 1,
  borderRadius: 2,
  ...sx
});
