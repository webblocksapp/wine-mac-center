import type { Meta, StoryObj } from '@storybook/react';
import { InstalledAppCard } from '@components';

const meta: Meta<typeof InstalledAppCard> = {
  title: 'App Components/InstalledAppCard',
  component: InstalledAppCard,
};

export default meta;
type Story = StoryObj<typeof InstalledAppCard>;

export const Overview: Story = {
  render: () => <InstalledAppCard />,
};
