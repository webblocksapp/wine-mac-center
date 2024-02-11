import type { Meta, StoryObj } from '@storybook/react';
import { AppPipeline } from '@components';
import {
  useWineAppConfigModel,
  useWineAppModel,
  useWineAppPipelineModel,
} from '@models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const meta: Meta<typeof AppPipeline> = {
  title: 'App Components/AppPipeline',
  component: AppPipeline,
  decorators: [
    (Story) => {
      const [loading, setLoading] = useState(true);
      const wineAppModel = useWineAppModel();
      const wineAppConfigModel = useWineAppConfigModel();
      const wineAppPipelineModel = useWineAppPipelineModel();
      const wineApps = useSelector(wineAppModel.selectWineApps);
      const wineApp = wineApps?.[0];

      useEffect(() => {
        (async () => {
          await wineAppModel.listAll();
        })();
      }, []);

      useEffect(() => {
        (async () => {
          if (wineApp?.id) {
            await wineAppConfigModel.read(wineApp?.id);
            await wineAppPipelineModel.runWineAppPipeline(wineApp?.id);
            setLoading(false);
          }
        })();
      }, [wineApp?.id]);

      return loading ? <>Loading...</> : <Story />;
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

    return <AppPipeline pipelineId={wineAppPipeline?.pipelineId} />;
  },
};
