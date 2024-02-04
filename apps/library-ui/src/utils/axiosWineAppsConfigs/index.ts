import { WINE_APPS_CONFIGS_URL } from '@constants';
import axios from 'axios';

export const axiosWineAppsConfigs = axios.create({
  baseURL: WINE_APPS_CONFIGS_URL,
});
