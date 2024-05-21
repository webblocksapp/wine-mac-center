import { useWineEngineModel } from '@models';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select, SelectProps } from 'reactjs-ui-form-fields';

export type WineEnginesSelectProps = SelectProps & {};

export const WineEnginesSelect: React.FC<WineEnginesSelectProps> = (props) => {
  const wineEngineModel = useWineEngineModel();
  const wineEngines = useSelector(wineEngineModel.selectWineEngines);

  useEffect(() => {
    wineEngineModel.list();
  }, []);

  return (
    <Select
      label="Wine Engine Version"
      {...props}
      options={wineEngines?.map((item) => ({ label: item, value: item }))}
    />
  );
};
