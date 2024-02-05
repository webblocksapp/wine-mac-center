import { EnvProvider } from '@components';
import { ThemeProvider } from '@reactjs-ui/core';
import type { Preview } from '@storybook/react';

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
        <EnvProvider>
          <Story />
        </EnvProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
