import { useState } from 'react';
import { Box, Button, TextField } from 'reactjs-ui-core';
import { Field, TextFieldProps } from 'reactjs-ui-form-fields';
import { InputAdornment } from '@mui/material';
import { os } from '@neutralinojs/lib';
import { readFile } from '@utils';

export type FileInputProps = Omit<
  TextFieldProps,
  'type' | 'label' | 'accept' | 'onInput'
> & {
  noSelectedFileLabel?: string;
  selectedFileLabel?: string;
  dialogText?: string;
  filters?: os.Filter[];
  onInput?: (file: File | undefined) => void;
};

export const FileInput: React.FC<FileInputProps> = ({
  onInput: onInputProp,
  control,
  fieldOptions,
  name,
  value: _,
  noSelectedFileLabel,
  selectedFileLabel,
  dialogText = 'Select file',
  filters = undefined,
  ...rest
}) => {
  const [fileName, setFileName] = useState('');

  return (
    <Field
      control={control}
      fieldOptions={fieldOptions}
      as="input"
      name={name}
      render={({ props: { onInput }, helpers }) => (
        <TextField
          fullWidth
          {...rest}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <Box pr={2}>
                  <Button type="button">
                    {fileName
                      ? selectedFileLabel || 'Change File'
                      : noSelectedFileLabel || 'Select File'}
                  </Button>
                </Box>
              </InputAdornment>
            ),
          }}
          value={fileName}
          onClick={async () => {
            const { file, fileName } = await readFile(dialogText, { filters });
            setFileName(fileName);
            onInput({ target: { value: file } });
            onInputProp?.(file);
          }}
          error={helpers.error}
          errorMessage={helpers.errorMessage}
        />
      )}
    />
  );
};
