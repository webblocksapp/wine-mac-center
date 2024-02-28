import { ProcessStatus } from '@constants';
import { WineAppPipeline, WineAppPipelineStatus } from '@interfaces';
import { createWineAppPipeline } from '@utils';
import { useState } from 'react';

const STATUS_COLORS = {
  [ProcessStatus.Cancelled]: 'orange',
  [ProcessStatus.Error]: 'red',
  [ProcessStatus.InProgress]: 'purple',
  [ProcessStatus.Pending]: 'blue',
  [ProcessStatus.Success]: 'green',
};

export const WinePipeline: React.FC = () => {
  const [pipelineStatus, setPipelineStatus] = useState<WineAppPipelineStatus>();
  const [pipeline, setPipeline] = useState<WineAppPipeline>();

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
    setPipeline(pipeline);
  };

  return (
    <div>
      <h1>Pipeline</h1>
      <hr />
      <div style={{ margin: '17px 0px' }}>
        {pipeline ? (
          <button onClick={() => pipeline.kill()}>Kill process</button>
        ) : (
          <button onClick={buildApp}>Build App</button>
        )}
      </div>
      {pipelineStatus?.jobs?.map?.((item) => (
        <div key={item.name}>
          {item?.steps?.map((step, index) => (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px',
                  border: '1px solid black',
                }}
                key={index}
              >
                <p>{step.name}</p>
                <p style={{ color: STATUS_COLORS[step.status] }}>
                  {step.status}
                </p>
              </div>
              {/* <pre
                style={{
                  height: '300px',
                  width: '300px',
                  overflow: 'auto',
                  background: 'black',
                  color: 'white',
                }}
              >
                <code>{step.output}</code>
              </pre> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
