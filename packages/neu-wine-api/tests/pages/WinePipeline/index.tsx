import { WineAppPipelineStatus } from '@interfaces';
import { createWineAppPipeline } from '@utils';
import { useState } from 'react';

export const WinePipeline: React.FC = () => {
  const [pipelineStatus, setPipelineStatus] = useState<WineAppPipelineStatus>();

  const buildApp = async () => {
    const pipeline = await createWineAppPipeline({
      appConfig: {
        appId: '',
        name: 'Steam',
        engineVersion: 'WS11WineCX64Bit23.6.0',
        dxvkEnabled: true,
        setupExecutablePath: '/Users/mauriver/Downloads/SteamSetup.exe',
        winetricks: { verbs: [] },
        executables: [
          {
            path: '/drive_c/Program Files (x86)/Steam/Steam.exe',
            main: true,
            flags: '-appLaunch 4000', //TODO check flags not working.
          },
        ],
      },
      outputEveryMs: 1000,
      debug: true,
    });

    pipeline.onUpdate?.((x) => {
      setPipelineStatus(x);
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
            {JSON.stringify(pipelineStatus, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
};
