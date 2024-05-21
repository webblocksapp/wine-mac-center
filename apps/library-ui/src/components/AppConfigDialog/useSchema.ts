import { WineAppConfig } from 'neu-wine-api';
import { useMemo } from 'react';
import { schema, Schema } from 'reactjs-ui-form-fields';

export type FormSchema = Pick<
  WineAppConfig,
  'name' | 'engineVersion' | 'dxvkEnabled'
>;

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
      }),
    [],
  );
};
