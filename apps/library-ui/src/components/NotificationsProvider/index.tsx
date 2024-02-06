import { withNotificationsProvider } from '@hocs';
import { useAppModel } from '@models';
import { OptionsObject, SnackbarKey, useSnackbar } from 'notistack';
import { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

type PrintMessageOptions = Omit<OptionsObject, 'variant'>;

type NotificationsContextType = {
  printMessage: (message: string, options: OptionsObject) => SnackbarKey;
  printSuccessMessage: (
    message: string,
    options?: PrintMessageOptions,
  ) => SnackbarKey;
  printInfoMessage: (
    message: string,
    options?: PrintMessageOptions,
  ) => SnackbarKey;
  printErrorMessage: (
    message: string,
    options?: PrintMessageOptions,
  ) => SnackbarKey;
};

export const NotificationsContext = createContext<NotificationsContextType>(
  {} as any,
);
export const useNotifications = () => useContext(NotificationsContext);

export interface NotificationsProviderProps {
  children?: React.ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> =
  withNotificationsProvider(({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const appModel = useAppModel();
    const errorMessage = useSelector(appModel.selectError);
    const successMessage = useSelector(appModel.selectSuccessMessage);
    const infoMessage = useSelector(appModel.selectInfoMessage);

    const printMessage: NotificationsContextType['printMessage'] = (
      message,
      options,
    ) =>
      enqueueSnackbar(message, {
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        ...options,
      });

    const printSuccessMessage: NotificationsContextType['printSuccessMessage'] =
      (message, options) =>
        printMessage(message, { ...options, variant: 'success' });

    const printInfoMessage: NotificationsContextType['printInfoMessage'] = (
      message,
      options,
    ) => printMessage(message, { ...options, variant: 'info' });

    const printErrorMessage: NotificationsContextType['printErrorMessage'] = (
      message,
      options,
    ) => printMessage(message, { ...options, variant: 'error' });

    useEffect(() => {
      if (errorMessage) {
        printErrorMessage(errorMessage);
        appModel.cleanError();
      }
    }, [errorMessage]);

    useEffect(() => {
      if (successMessage) {
        printSuccessMessage(successMessage);
        appModel.cleanSuccessMessage();
      }
    }, [successMessage]);

    useEffect(() => {
      if (infoMessage) {
        printInfoMessage(infoMessage);
        appModel.cleanInfoMessage();
      }
    }, [infoMessage]);

    return (
      <NotificationsContext.Provider
        value={{
          printMessage,
          printErrorMessage,
          printSuccessMessage,
          printInfoMessage,
        }}
      >
        {children}
      </NotificationsContext.Provider>
    );
  });
