import { useWinetrickApiClient } from '@api-clients';
import { useEffect, useState } from 'react';

export const ListGames: React.FC = () => {
  const { listGames } = useWinetrickApiClient();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setText(JSON.stringify(await listGames(), null, 2));
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : (
    <pre>
      <code>{text}</code>
    </pre>
  );
};
