import { Meta, StoryObj } from '@storybook/react';
import { NotificationsProvider, useNotifications } from '@components';
import { useAppModel } from '@models';
import { Button, Stack } from '@reactjs-ui/core';

const meta: Meta<typeof NotificationsProvider> = {
  title: 'App Components/NotificationsProvider',
  component: NotificationsProvider,
};

type Story = StoryObj<typeof NotificationsProvider>;
export default meta;

export const Overview: Story = {
  render: () => {
    const { printErrorMessage, printSuccessMessage } = useNotifications();

    return (
      <Stack direction="row" spacing={1}>
        <Button onClick={() => printSuccessMessage('Success Message')}>
          Show success message
        </Button>
        <Button onClick={() => printErrorMessage('Error Message')}>
          Show error message
        </Button>
      </Stack>
    );
  },
};

export const ErrorDispatching: Story = {
  render: () => {
    const { dispatchError } = useAppModel();

    return (
      <Stack direction="row" spacing={1}>
        <Button onClick={() => dispatchError(new Error('Error Message'))}>
          Dispatch error message
        </Button>
        <Button onClick={() => dispatchError('No error instance')}>
          Dispatch unknown error message
        </Button>
      </Stack>
    );
  },
};
