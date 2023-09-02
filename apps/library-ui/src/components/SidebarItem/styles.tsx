import { SidebarItemProps } from '@components';

export const styles = ({
  sx,
}: Partial<SidebarItemProps>): SidebarItemProps['sx'] => ({
  paddingY: 1.5,
  borderRadius: 2,
  '& > .MuiTypography-root': {
    transition: 'color 0.1s linear',
  },
  '& .MuiTypography-root > svg': {
    transition: 'color 0.1s linear',
  },
  '&:hover': {
    backgroundColor: 'inherit',
    '& > .MuiTypography-root': {
      color: (theme) => theme.palette.text.primary,
    },
    '& .MuiTypography-root > svg': {
      color: (theme) => theme.palette.text.primary,
    },
  },
  '&.Mui-selected': { backgroundColor: 'inherit' },
  '&.Mui-selected:hover': { backgroundColor: 'inherit' },
  ...sx,
});
