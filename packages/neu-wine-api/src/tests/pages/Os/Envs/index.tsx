import { useEnv, useWine } from '@utils';
import { useEffect, useState } from 'react';

export const Envs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    Array<{ label: string; value: { stdOut?: string; stdErr?: string } }>
  >([]);
  const env = useEnv();
  const wine = useWine();

  useEffect(() => {
    (async () => {
      setData([
        {
          label: 'Home',
          value: { stdOut: env.get().HOME },
        },
        {
          label: 'Directory name',
          value: { stdOut: env.dirname() },
        },
        {
          label: 'Scripts path',
          value: { stdOut: env.get().SCRIPTS_PATH },
        },
        {
          label: 'WINE_APP_NAME',
          value: await wine.execCommand('echo $WINE_APP_NAME'),
        },
        {
          label: 'WINE_ENGINE_VERSION',
          value: await wine.execCommand('echo $WINE_ENGINE_VERSION'),
        },
        {
          label: 'WINE_APP_PATH',
          value: await wine.execCommand('echo $WINE_APP_PATH'),
        },
        {
          label: 'WINE_APP_CONTENTS_PATH',
          value: await wine.execCommand('echo $WINE_APP_CONTENTS_PATH'),
        },
        {
          label: 'WINE_CONFIG_APP_NAME',
          value: await wine.execCommand('echo $WINE_CONFIG_APP_NAME'),
        },
        {
          label: 'WINE_CONFIG_APP_PATH',
          value: await wine.execCommand('echo $WINE_CONFIG_APP_PATH'),
        },
        {
          label: 'WINE_APP_SCRIPTS_PATH',
          value: await wine.execCommand('echo $WINE_APP_SCRIPTS_PATH'),
        },
        {
          label: 'WINE_APP_SHARED_SUPPORT_PATH',
          value: await wine.execCommand('echo $WINE_APP_SHARED_SUPPORT_PATH'),
        },
        {
          label: 'WINE_APP_PREFIX_PATH',
          value: await wine.execCommand('echo $WINE_APP_PREFIX_PATH'),
        },
      ]);
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : (
    data.map((item, index) => (
      <div key={index} style={{ paddingBottom: 17 }}>
        <label>{item.label}</label>
        <input
          style={{ width: '100%' }}
          readOnly
          value={item.value.stdOut || ''}
        />
        {item.value.stdErr ? (
          <small style={{ color: 'red' }}>{item.value.stdErr}</small>
        ) : (
          <></>
        )}
      </div>
    ))
  );
};
