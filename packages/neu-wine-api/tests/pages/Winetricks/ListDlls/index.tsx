import { useWinetrickApiClient } from 'neu-wine-api';
import { useEffect, useState } from 'react';

export const ListDlls: React.FC = () => {
  const { listDlls } = useWinetrickApiClient();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setText(JSON.stringify(await listDlls(), null, 2));
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
