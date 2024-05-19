import type { Meta, StoryObj } from '@storybook/react';
import { AppCard } from '@components';

const meta: Meta<typeof AppCard> = {
  title: 'App Components/AppCard',
  component: AppCard,
};

export default meta;
type Story = StoryObj<typeof AppCard>;

export const Overview: Story = {
  render: () => <AppCard />,
};
