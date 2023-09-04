import { useWinetrickApiClient } from '@api-clients';
import { useEffect, useState } from 'react';

export const Help: React.FC = () => {
  const { help } = useWinetrickApiClient();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setText(await help());
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
