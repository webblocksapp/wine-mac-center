import { fileMaxSize, isRequired } from '@utils';
import { WineAppConfig } from 'neu-wine-api';
import { useMemo } from 'react';
import { schema, Schema } from 'reactjs-ui-form-fields';

export type FormSchema = Pick<
  WineAppConfig,
  'name' | 'engineVersion' | 'dxvkEnabled'
> & { iconFile: File };

export const useSchema = () => {
  return useMemo<Schema<FormSchema>>(
    () =>
      schema.object({
        name: schema.string().required(),
        engineVersion: schema.string().required(),
        dxvkEnabled: schema
          .boolean()
          .required()
          .oneOf([true, false])
          .default(true),
        iconFile: schema
          .mixed<File>()
          .test({
            name: 'fileSize',
            message: 'File exceeds 200kb',
            test: (file) => fileMaxSize(file, 200000),
          })
          .test({
            name: 'isRequired',
            message: 'File is required',
            test: isRequired,
          })
          .required(),
      }),
    [],
  );
};
