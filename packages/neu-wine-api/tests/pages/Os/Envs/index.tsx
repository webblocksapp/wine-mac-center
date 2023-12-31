import { useEffect, useState } from 'react';
import { useEnv } from 'neu-wine-api';
import { Input } from '@@components';

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
      ]);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        data.map((item, index) => (
          <Input
            key={index}
            readOnly
            label={item.label}
            value={item.value.stdOut || ''}
            error={Boolean(item.value.stdErr)}
            errorMessage={item.value.stdErr}
          />
        ))
      )}
    </>
  );
};
