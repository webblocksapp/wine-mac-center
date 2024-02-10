import { PROCESS_STATUS_COLORS } from '@constants';
import { RootState } from '@interfaces';
import { useWineAppPipelineModel } from '@models';
import {
  Body1,
  Body2,
  Box,
  Card,
  H6,
  Stack,
  StackProps,
} from '@reactjs-ui/core';
import { useSelector } from 'react-redux';

export interface AppPipelineProps extends StackProps {
  pipelineId?: string;
}

export const AppPipeline: React.FC<AppPipelineProps> = ({
  pipelineId,
  ...rest
}) => {
  const wineAppPipelineModel = useWineAppPipelineModel();
  const wineAppPipeline = useSelector((state: RootState) =>
    wineAppPipelineModel.selectWineAppPipeline(state, pipelineId)
  );

  console.log(wineAppPipeline);

  return (
    <Stack spacing={2} {...rest}>
      <H6>Command & Conquer 3</H6>
      <Stack spacing={2}>
        {Array(4)
          .fill(null)
          .map(() => (
            <Card>
              <Stack spacing={1}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  p={1}
                >
                  <Body1 fontWeight={500} color="text.secondary">
                    Creating wine app
                  </Body1>
                  <Box border={1} p={1} borderRadius={2} color="text.secondary">
                    <Body2
                      fontWeight={500}
                      color={PROCESS_STATUS_COLORS['inProgress']}
                    >
                      In progress...
                    </Body2>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          ))}
      </Stack>
    </Stack>
  );
};
