import { SortDirection } from '@interfaces';
import { Select, SelectProps } from 'reactjs-ui-core';

export interface SortDirectionSelectProps
  extends Omit<SelectProps, 'onChange' | 'options'> {
  onChange?: (direction: SortDirection) => void;
}

export const SortDirectionSelect: React.FC<SortDirectionSelectProps> = ({
  onChange,
  ...rest
}) => {
  return (
    <Select
      {...rest}
      options={[
        { label: 'Sort A-Z', value: 'asc' },
        { label: 'Sort Z-A', value: 'desc' },
      ]}
      onChange={(event) =>
        onChange?.((event.target as HTMLInputElement).value as 'asc' | 'desc')
      }
    />
  );
};
