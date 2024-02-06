import { useWineAppConfigApiClient } from '@api-clients';
import { WineAppConfigActionType as ActionType } from '@constants';
import { WineAppConfigAction, WineAppConfigState } from '@interfaces';
import { useAppModel } from '@models';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const useWineAppConfigModel = () => {
  const appModel = useAppModel();
  const wineAppConfigApiClient = useWineAppConfigApiClient();
  const dispatch = useDispatch<Dispatch<WineAppConfigAction>>();

  const listAll = async () => {
    try {
      dispatchLoader({ listingAll: true });
      dispatch({
        type: ActionType.LIST_ALL,
        wineAppsConfigs: await wineAppConfigApiClient.listAll(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingAll: false });
    }
  };

  const dispatchLoader = (loaders: Partial<WineAppConfigState['loaders']>) =>
    dispatch({ type: ActionType.LOADING, loaders });

  return {
    listAll,
  };
};
