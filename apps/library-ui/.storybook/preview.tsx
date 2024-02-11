import {
  EnvProvider,
  NotificationsProvider,
  WineAppPipelineProvider,
} from '@components';
import { ThemeProvider } from '@reactjs-ui/core';
import { store } from '@store';
import type { Preview } from '@storybook/react';
import { Provider } from 'react-redux';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Provider store={store}>
          <NotificationsProvider>
            <EnvProvider>
              <WineAppPipelineProvider>
                <Story />
              </WineAppPipelineProvider>
            </EnvProvider>
          </NotificationsProvider>
        </Provider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
