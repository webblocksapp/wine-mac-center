import { useEnv } from '@utils';
import { useEffect, useState } from 'react';

export const Envs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    Array<{ label: string; value: { stdOut?: string; stdErr?: string } }>
  >([]);
  const env = useEnv();

  useEffect(() => {
    (async () => {
      setData([
        {
          label: 'Directory name',
          value: { stdOut: env.dirname() },
        },
        {
          label: 'Scripts path',
          value: { stdOut: env.get().SCRIPTS_PATH },
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
