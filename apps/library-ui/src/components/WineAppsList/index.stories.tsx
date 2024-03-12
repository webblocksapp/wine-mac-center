import type { Meta, StoryObj } from '@storybook/react';
import { WineAppsList } from '@components';
import { Box } from '@reactjs-ui/core';

const meta: Meta<typeof WineAppsList> = {
  title: 'App Components/WineAppsList',
  component: WineAppsList,
};

export default meta;
type Story = StoryObj<typeof WineAppsList>;

export const Overview: Story = {
  render: () => (
    <Box height={600} width={1200}>
      <WineAppsList />
    </Box>
  ),
};
