import {
  AppIcon,
  CreateAppIcon,
  HomeIcon,
  SettingsIcon,
  TasksIcon,
} from '@assets/icons';
import { MenuItem } from '@interfaces';

export const SIDEBAR_MENU: MenuItem[] = [
  { text: 'Home', route: 'home', icon: HomeIcon },
  { text: 'Apps', route: 'apps', icon: AppIcon },
  { text: 'Create App', route: 'create-app', icon: CreateAppIcon },
  { text: 'Tasks', route: 'tasks', icon: TasksIcon },
  { text: 'Settings', route: 'settings', icon: SettingsIcon },
];
