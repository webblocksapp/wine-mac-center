import { useWinetrickApiClient } from 'neu-wine-api';
import { useEffect, useState } from 'react';

export const Help: React.FC = () => {
  const { help } = useWinetrickApiClient();
  const [data, setData] = useState({ stdOut: '', stdErr: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setData(await help());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : (
    <pre>
      <code>{data.stdOut}</code>
      <code>{data.stdErr}</code>
    </pre>
  );
};
