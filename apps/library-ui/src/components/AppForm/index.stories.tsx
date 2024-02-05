import type { Meta, StoryObj } from '@storybook/react';
import { AppForm } from '@components';

const meta: Meta<typeof AppForm> = {
  title: 'App Components/AppForm',
  component: AppForm,
};

export default meta;
type Story = StoryObj<typeof AppForm>;

export const Overview: Story = {};
