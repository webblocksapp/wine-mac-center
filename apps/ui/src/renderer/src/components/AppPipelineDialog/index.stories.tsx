import type { Meta, StoryObj } from '@storybook/react';
import { AppPipelineDialog } from '@components';
import {
  useWineAppConfigModel,
  useWineAppModel,
  useWineAppPipelineModel,
} from '@models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const meta: Meta<typeof AppPipelineDialog> = {
  title: 'App Components/AppPipelineDialog',
  component: AppPipelineDialog,
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
          if (wineApp?.appConfigId) {
            await wineAppConfigModel.read(wineApp?.appConfigId);
            await wineAppPipelineModel.runWineAppPipelineByAppConfigId(
              wineApp?.appConfigId,
            );
            setLoading(false);
          }
        })();
      }, [wineApp?.appConfigId]);

      return loading ? <>Loading...</> : <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AppPipelineDialog>;

export const Overview: Story = {
  render: (_) => {
    const wineAppPipelineModel = useWineAppPipelineModel();
    const wineAppPipeline = useSelector(
      wineAppPipelineModel.selectWineAppPipelineWithMeta,
    );

    return wineAppPipeline ? (
      <AppPipelineDialog open={true} />
    ) : (
      <>Loading...</>
    );
  },
};
