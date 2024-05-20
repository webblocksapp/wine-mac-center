import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Icon, TextField, TextFieldProps } from 'reactjs-ui-core';

export type SearchFieldProps = TextFieldProps & {};

export const SearchField: React.FC<SearchFieldProps> = (props) => {
  return (
    <TextField
      InputProps={{
        startAdornment: <Icon pr={1} render={MagnifyingGlassIcon} />,
      }}
      placeholder="Search..."
      {...props}
    />
  );
};
