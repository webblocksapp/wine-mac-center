import { AppIcon, HomeIcon } from '@assets/icons';
import { MenuItem } from '@interfaces/MenuItem';

export const SIDEBAR_MENU: MenuItem[] = [
  { text: 'Home', route: 'home', icon: HomeIcon },
  { text: 'Apps', route: 'apps', icon: AppIcon }
];
