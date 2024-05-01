import { WINE_APPS_ENGINES_URL } from '@constants';
import axios from 'axios';

export const axiosWineEngines = axios.create({
  baseURL: WINE_APPS_ENGINES_URL,
});
