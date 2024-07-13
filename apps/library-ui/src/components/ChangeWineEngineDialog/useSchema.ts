import { WineAppConfig } from 'neu-wine-api';
import { useMemo } from 'react';
import { schema, Schema } from 'reactjs-ui-form-fields';

export type FormSchema = Pick<WineAppConfig, 'engineVersion'>;

export const useSchema = () => {
  return useMemo<Schema<FormSchema>>(
    () =>
      schema.object({
        engineVersion: schema.string().required(),
      }),
    [],
  );
};
