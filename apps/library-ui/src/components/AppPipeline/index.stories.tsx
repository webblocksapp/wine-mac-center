import type { Meta, StoryObj } from '@storybook/react';
import { AppPipeline } from '@components';

const meta: Meta<typeof AppPipeline> = {
  title: 'App Components/AppPipeline',
  component: AppPipeline,
};

export default meta;
type Story = StoryObj<typeof AppPipeline>;

export const Overview: Story = {};
