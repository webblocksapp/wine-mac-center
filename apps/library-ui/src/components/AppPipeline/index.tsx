import { RootState } from '@interfaces';
import { useWineAppPipelineModel } from '@models';
import { Body1, Card, H6, Stack, StackProps } from '@reactjs-ui/core';
import { useSelector } from 'react-redux';
import { StatusBox } from '@components';

export interface AppPipelineProps extends StackProps {
  pipelineId?: string;
}

export const AppPipeline: React.FC<AppPipelineProps> = ({
  pipelineId,
  ...rest
}) => {
  const wineAppPipelineModel = useWineAppPipelineModel();
  const wineAppPipeline = useSelector((state: RootState) =>
    wineAppPipelineModel.selectWineAppPipelineWithMeta(state, pipelineId)
  );

  return (
    <Stack spacing={2} {...rest}>
      <H6>{wineAppPipeline.meta.wineApp?.name}</H6>
      {wineAppPipeline.jobs?.map?.((item) => (
        <Stack>
          <Stack spacing={2}>
            {item?.steps?.map((step, index) => (
              <Card key={index}>
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    p={1}
                  >
                    <Body1 fontWeight={500} color="text.secondary">
                      {step.name}
                    </Body1>
                    <StatusBox status={step.status} />
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
