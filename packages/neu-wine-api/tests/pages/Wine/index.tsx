import { useWine } from '@utils';
import { useEffect, useMemo, useState } from 'react';

export const Wine: React.FC = () => {
  const wine = useMemo(() => useWine(), []);
  const [counter, setCounter] = useState(0);

  const scaffoldApp = async () => {
    // await wine.scaffoldApp({
    //   onStdOut: (data) => {
    //     console.log(data);
    //   },
    //   onStdErr: (data) => {
    //     console.log(data);
    //   },
    // });
    // console.log('=======>');
  };

  useEffect(() => {
    scaffoldApp();
  }, []);

  return (
    <>
      Wine Works{' '}
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
    </>
  );
};
