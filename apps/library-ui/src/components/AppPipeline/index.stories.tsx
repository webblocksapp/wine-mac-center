import type { Meta, StoryObj } from '@storybook/react';
import { AppPipeline } from '@components';
import {
  useWineAppConfigModel,
  useWineAppModel,
  useWineAppPipelineModel,
} from '@models';
import { useEffect, useRef } from 'react';
import { data } from '@mocks/data';
import { ProcessStatus } from 'neu-wine-api';
import { useSelector } from 'react-redux';
import { WineAppPipelineStatus } from '@interfaces';

const meta: Meta<typeof AppPipeline> = {
  title: 'App Components/AppPipeline',
  component: AppPipeline,
  decorators: [
    (Story) => {
      const wineAppModel = useWineAppModel();
      const wineAppConfigsModel = useWineAppConfigModel();
      const wineAppPipelineModel = useWineAppPipelineModel();

      useEffect(() => {
        const { id } = data.wineApps[0];
        const wineAppConfig = data.wineAppsConfigs.find(
          (item) => item.appId == id
        )!;
        const wineAppPipeline = data.wineAppsPipelines.find(
          (item) => item.appId == id
        )!;
        wineAppModel.dispatchListAll(data.wineApps);
        wineAppConfigsModel.dispatchPatch(wineAppConfig);
        wineAppPipelineModel.dispatchPatch(wineAppPipeline);
      }, []);

      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AppPipeline>;

export const Overview: Story = {
  render: (_) => {
    const wineAppPipelineModel = useWineAppPipelineModel();
    const wineAppPipelines = useSelector(
      wineAppPipelineModel.selectWineAppPipelines
    );
    const wineAppPipeline = wineAppPipelines?.[0];
    const ref = useRef<{ pipeline?: WineAppPipelineStatus; stepIndex: number }>(
      {
        pipeline: wineAppPipeline,
        stepIndex: 0,
      }
    );

    useEffect(() => {
      const id = setInterval(() => {
        if (ref.current.pipeline?.jobs === undefined) return;
        ref.current.pipeline.jobs = ref.current.pipeline?.jobs?.map(
          (item, index) => {
            if (index === 0) {
              return {
                ...item,
                steps: item.steps.map((step, stepIndex) => {
                  if (stepIndex === ref.current.stepIndex) {
                    return { ...step, status: ProcessStatus.InProgress };
                  }
                  return step;
                }),
              };
            }
            return item;
          }
        );

        wineAppPipelineModel.dispatchPatch(ref.current.pipeline);
        ref.current.stepIndex++;
      }, 1000);

      if (wineAppPipeline?.status === ProcessStatus.Success) {
        clearInterval(id);
      }

      return () => {
        clearInterval(id);
      };
    }, []);

    return <AppPipeline pipelineId={wineAppPipeline?.pipelineId} />;
  },
};
