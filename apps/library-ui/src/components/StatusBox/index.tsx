import { Body2, Box, BoxProps } from '@reactjs-ui/core';
import { PROCESS_STATUS_COLORS } from '@constants';
import { ProcessStatus } from 'neu-wine-api';
import { useMemo } from 'react';

export interface StatusBoxProps extends BoxProps {
  status?: ProcessStatus;
}

export const StatusBox: React.FC<StatusBoxProps> = ({
  status = 'pending',
  ...rest
}) => {
  const TEXTS: Record<ProcessStatus, string> = useMemo(
    () => ({
      cancelled: 'Cancelled',
      error: 'Error',
      inProgress: 'In progress',
      pending: 'Pending',
      success: 'Success',
    }),
    []
  );

  return (
    <Box border={1} p={1} borderRadius={2} color="text.secondary" {...rest}>
      <Body2 fontWeight={500} color={PROCESS_STATUS_COLORS[status]}>
        {TEXTS[status]}
      </Body2>
    </Box>
  );
};
