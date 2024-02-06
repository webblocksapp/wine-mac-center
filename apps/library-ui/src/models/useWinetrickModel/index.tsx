import { useWinetrickApiClient } from 'neu-wine-api';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { WinetrickActionType as ActionType } from '@constants';
import { WinetrickAction, WinetrickState } from '@interfaces';
import { useAppModel } from '@models';

export const useWinetrickModel = () => {
  const appModel = useAppModel();
  const winetrickApiClient = useWinetrickApiClient();
  const dispatch = useDispatch<Dispatch<WinetrickAction>>();

  const listApps = async () => {
    try {
      dispatchLoader({ listingApps: true });
      dispatchWinetricks({
        apps: await winetrickApiClient.listApps(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingApps: false });
    }
  };

  const listBenchmarks = async () => {
    try {
      dispatchLoader({ listingBenchmarks: true });
      dispatchWinetricks({
        benchmarks: await winetrickApiClient.listBenchmarks(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingBenchmarks: false });
    }
  };

  const listDlls = async () => {
    try {
      dispatchLoader({ listingDlls: true });
      dispatchWinetricks({
        dlls: await winetrickApiClient.listDlls(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingDlls: false });
    }
  };

  const listFonts = async () => {
    try {
      dispatchLoader({ listingFonts: true });
      dispatchWinetricks({
        fonts: await winetrickApiClient.listFonts(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingFonts: false });
    }
  };

  const listGames = async () => {
    try {
      dispatchLoader({ listingGames: true });
      dispatchWinetricks({
        games: await winetrickApiClient.listGames(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingGames: false });
    }
  };

  const listSettings = async () => {
    try {
      dispatchLoader({ listingSettings: true });
      dispatchWinetricks({
        settings: await winetrickApiClient.listSettings(),
      });
    } catch (error) {
      appModel.dispatchError(error);
    } finally {
      dispatchLoader({ listingSettings: false });
    }
  };

  const listAll = async () => {
    dispatchLoader({ listingAll: true });
    await Promise.allSettled([
      listApps(),
      listBenchmarks(),
      listDlls(),
      listFonts(),
      listGames(),
      listSettings(),
    ]);
    dispatchLoader({ listingAll: false });
  };

  const dispatchWinetricks = (
    winetricks: Partial<WinetrickState['winetricks']>
  ) => {
    dispatch({ type: ActionType.LIST, winetricks });
  };

  const dispatchLoader = (loaders: Partial<WinetrickState['loaders']>) =>
    dispatch({ type: ActionType.LOADING, loaders });

  return {
    listApps,
    listBenchmarks,
    listDlls,
    listFonts,
    listGames,
    listSettings,
    listAll,
  };
};
