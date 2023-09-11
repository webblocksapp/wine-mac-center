import { useEffect, useState } from 'react';
import { ScaffoldApp } from './ScaffoldApp';

export const Wine: React.FC = () => {
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
    <div>
      <ScaffoldApp />
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
    </div>
  );
};
