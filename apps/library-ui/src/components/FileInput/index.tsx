import { useRef, useState } from 'react';
import { Box, Button, TextField } from 'reactjs-ui-core';
import { Field, TextFieldProps } from 'reactjs-ui-form-fields';
import { InputAdornment } from '@mui/material';

export type FileInputProps = Omit<TextFieldProps, 'type' | 'label'> & {
  noSelectedFileLabel?: string;
  selectedFileLabel?: string;
  accept?: string;
};

export const FileInput: React.FC<FileInputProps> = ({
  onInput: onInputProp,
  control,
  fieldOptions,
  name,
  value: _,
  noSelectedFileLabel,
  selectedFileLabel,
  accept,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  return (
    <Field
      control={control}
      fieldOptions={fieldOptions}
      as="input"
      name={name}
      render={({ props: { onInput, value: _, ...props }, helpers }) => (
        <>
          <input
            {...props}
            onInput={(event) => {
              const files = (event.target as HTMLInputElement).files || [];
              const [file] = files;
              setFileName(file.name);
              onInputProp?.(event);
              onInput?.({ target: { value: file } });
            }}
            ref={inputRef}
            style={{ display: 'none' }}
            type="file"
            accept={accept}
          />
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
            onClick={() => inputRef.current?.click()}
            error={helpers.error}
            errorMessage={helpers.errorMessage}
          />
        </>
      )}
    />
  );
};
