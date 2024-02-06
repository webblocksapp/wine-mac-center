import { SnackbarProvider } from 'notistack';

export const withNotificationsProvider = <T,>(Component: React.FC<T>) => {
  return (props: T & JSX.IntrinsicAttributes) => {
    return (
      <SnackbarProvider maxSnack={3}>
        <Component {...props} />
      </SnackbarProvider>
    );
  };
};
