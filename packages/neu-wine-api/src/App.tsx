import { computer } from '@neutralinojs/lib';
import { useEffect } from 'react';

export const App = () => {
  const getMemoryInfo = async () => {
    let memoryInfo = await computer.getMemoryInfo();
    console.log(memoryInfo);
  };

  useEffect(() => {
    getMemoryInfo();
  }, []);

  return <>Hello World ssss</>;
};
