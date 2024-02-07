import { WineAppPipelineStatus } from '@interfaces';
import { createWineAppPipeline } from '@utils';
import { useState } from 'react';

export const WinePipeline: React.FC = () => {
  const [jobs] = useState<WineAppPipelineStatus>();

  const buildApp = async () => {
    const pipeline = await createWineAppPipeline({
      appConfig: {
        appId: '',
        name: 'Steam',
        engineVersion: 'WS11WineCX64Bit23.6.0',
        dxvkEnabled: true,
        setupExecutablePath: '/Users/mauriver/Downloads/SteamSetup.exe',
        winetricks: { verbs: [] },
      },
      outputEveryMs: 1000,
      debug: true,
    });

    pipeline.onUpdate?.((x) => {
      console.log(x.jobs[0].steps[0].output);
    });

    pipeline.run();
  };

  return (
    <div>
      <h1>Pipeline</h1>
      <hr />
      <div style={{ margin: '17px 0px' }}>
        <button onClick={buildApp}>Build App</button>
      </div>
      <div>
        <pre>
          <code
            style={{
              wordBreak: 'normal',
              wordWrap: 'break-word',
              display: 'block',
              whiteSpace: 'pre-wrap',
            }}
          >
            {JSON.stringify(jobs, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
};
