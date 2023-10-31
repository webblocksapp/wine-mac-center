import { Select, SelectProps } from '@@components';
import { WineApp } from '@interfaces';
import { useEffect, useState } from 'react';

export interface WineEnginesSelectProps extends Omit<SelectProps, 'options'> {
  wineApp: WineApp;
}

export const WineEnginesSelect: React.FC<WineEnginesSelectProps> = ({
  wineApp,
  ...rest
}) => {
  const [options, setOptions] = useState<Array<{ value: string }>>([]);

  const initOptions = async () => {
    const options = (await wineApp.listWineEngines()).map((item) => ({
      value: item,
    }));
    setOptions(options);
  };

  useEffect(() => {
    initOptions();
  }, []);

  return <Select {...rest} options={options} />;
};
