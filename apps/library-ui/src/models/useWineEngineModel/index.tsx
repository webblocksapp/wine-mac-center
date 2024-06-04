import { useWineEngineApiClient } from '@api-clients';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RootState, WineEngineAction, WineEngineState } from '@interfaces';
import { WineEngineActionType as ActionType } from '@constants';
import { useAppModel } from '@models';
import { store } from '@store';

export const useWineEngineModel = () => {
  const appModel = useAppModel();
  const wineEngineApiClient = useWineEngineApiClient();
  const dispatch = useDispatch<Dispatch<WineEngineAction>>();

  const listDownloadables = async () => {
    try {
      dispatchLoader({ listingDownloadables: true });
      dispatch({
        type: ActionType.LIST_DOWNLOADABLES,
        wineEnginesDownloadables: await wineEngineApiClient.listDownloadables(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingDownloadables: false });
    }
  };

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

  const findEngineURLs = (engineVersion: string) => {
    const wineEnginesDownloadables = selectWineEnginesDownloadables(
      store.getState(),
    );
    const engineURLs = wineEnginesDownloadables?.find?.(
      (item) => item.version == engineVersion,
    )?.urls;

    if (engineURLs === undefined || !engineURLs?.length) {
      throw new Error('No wine engines available for download.');
    }

    return engineURLs;
  };

  const dispatchLoader = (loaders: Partial<WineEngineState['loaders']>) => {
    dispatch({ type: ActionType.LOADING, loaders });
  };

  const selectWineEngineState = (state: RootState) => state.wineEngineState;
  const selectWineEngines = createSelector(
    [selectWineEngineState],
    (wineEngineState) => wineEngineState.wineEngines,
  );
  const selectWineEnginesDownloadables = createSelector(
    [selectWineEngineState],
    (wineEngineState) => wineEngineState.wineEnginesDownloadables,
  );

  return {
    findEngineURLs,
    list,
    listDownloadables,
    selectWineEngineState,
    selectWineEngines,
    selectWineEnginesDownloadables,
  };
};
