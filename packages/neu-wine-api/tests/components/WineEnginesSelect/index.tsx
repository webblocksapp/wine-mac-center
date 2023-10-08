import { Select, SelectProps } from '@@components';
import { useWineEngineApiClient } from '@api-clients';
import { useEffect, useState } from 'react';

export interface WineEnginesSelectProps extends Omit<SelectProps, 'options'> {}

export const WineEnginesSelect: React.FC<WineEnginesSelectProps> = (props) => {
  const wineEngineApiClient = useWineEngineApiClient();
  const [options, setOptions] = useState<Array<{ value: string }>>([]);

  const initOptions = async () => {
    const options = (await wineEngineApiClient.list()).map((item) => ({
      value: item,
    }));
    setOptions(options);
  };

  useEffect(() => {
    initOptions();
  }, []);

  return <Select {...props} options={options} />;
};
