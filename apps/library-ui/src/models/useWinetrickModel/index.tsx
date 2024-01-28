import { useWinetrickApiClient } from '@api-clients';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { WinetrickActionType as ActionType } from '@constants';
import { WinetrickAction, WinetrickState } from '@interfaces';

export const useWinetrickModel = () => {
  const winetrickApiClient = useWinetrickApiClient();
  const dispatch = useDispatch<Dispatch<WinetrickAction>>();

  const listAll = async () => {
    try {
      dispatchLoader({ listingAll: true });
      dispatch({
        type: ActionType.LIST_ALL,
        winetricks: await winetrickApiClient.listAll(),
      });
    } catch (error) {
    } finally {
      dispatchLoader({ listingAll: false });
    }
  };

  const dispatchLoader = (loaders: Partial<WinetrickState['loaders']>) =>
    dispatch({ type: ActionType.LOADING, loaders });

  return {
    listAll,
  };
};
