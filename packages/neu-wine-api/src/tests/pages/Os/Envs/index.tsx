import { os } from '@neutralinojs/lib';
import { useEnv } from '@utils';
import { useEffect, useState } from 'react';

export const Envs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Array<{ label: string; value: string }>>([]);
  const env = useEnv();

  useEffect(() => {
    (async () => {
      setData([{ label: 'Current working dir', value: await env.cwd() }]);
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : (
    data.map((item, index) => (
      <div key={index}>
        <label>{item.label}</label>
        <input style={{ width: '100%' }} readOnly value={item.value || ''} />
      </div>
    ))
  );
};
