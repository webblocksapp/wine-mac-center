import { Select, SelectProps } from '@@components';
import { useWineContext } from '@@components';
import { useEffect, useState } from 'react';

export interface WineEnginesSelectProps extends Omit<SelectProps, 'options'> {}

export const WineEnginesSelect: React.FC<WineEnginesSelectProps> = (props) => {
  const { wine } = useWineContext();
  const [options, setOptions] = useState<Array<{ value: string }>>([]);

  const initOptions = async () => {
    const options = (await wine.listWineEngines()).map((item) => ({
      value: item,
    }));
    setOptions(options);
  };

  useEffect(() => {
    initOptions();
  }, []);

  return <Select {...props} options={options} />;
};
