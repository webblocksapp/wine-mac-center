import { useWineEngineApiClient } from 'neu-wine-api';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RootState, WineEngineAction, WineEngineState } from '@interfaces';
import { WineEngineActionType as ActionType } from '@constants';
import { useAppModel } from '@models';

export const useWineEngineModel = () => {
  const appModel = useAppModel();
  const wineEngineApiClient = useWineEngineApiClient();
  const dispatch = useDispatch<Dispatch<WineEngineAction>>();

  const list = async () => {
    try {
      dispatchLoader({ listing: true });
      dispatch({
        type: ActionType.LIST,
        wineEngines: await wineEngineApiClient.list(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listing: false });
    }
  };

  const dispatchLoader = (loaders: Partial<WineEngineState['loaders']>) => {
    dispatch({ type: ActionType.LOADING, loaders });
  };

  const selectWineEngineState = (state: RootState) => state.wineEngineState;
  const selectWineEngines = createSelector(
    [selectWineEngineState],
    (wineEngineState) => wineEngineState.wineEngines,
  );

  return {
    list,
    selectWineEngineState,
    selectWineEngines,
  };
};
