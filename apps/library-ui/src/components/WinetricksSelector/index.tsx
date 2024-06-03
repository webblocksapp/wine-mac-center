import { useWinetrickModel } from '@models';
import { Winetricks } from 'neu-wine-api';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Box, Grid, SkeletonLoader, Stack } from 'reactjs-ui-core';
import { Checkbox, Field, FieldProps } from 'reactjs-ui-form-fields';

export interface WinetricksSelectorProps extends FieldProps {
  name?: string;
}

const CATEGORIES = [
  { key: 'apps', label: 'Apps' },
  { key: 'benchmarks', label: 'Benchmarks' },
  { key: 'dlls', label: 'Dlls' },
  { key: 'fonts', label: 'Fonts' },
  { key: 'settings', label: 'Settings' },
];

export const WinetricksSelector: React.FC<WinetricksSelectorProps> = ({
  name,
  control,
  fieldOptions,
  value,
}) => {
  const winetrickModel = useWinetrickModel();
  const { loaders, winetricks } = useSelector(
    winetrickModel.selectWinetrickState,
  );

  useEffect(() => {
    winetrickModel.listAll();
  }, []);

  return (
    <Field
      control={control}
      fieldOptions={fieldOptions}
      as="checkbox-group"
      name={name}
      value={value}
      render={({ props, helpers }) => (
        <SkeletonLoader loading={loaders.listingAll}>
          <Stack spacing={1}>
            {CATEGORIES.map((category) => (
              <Box key={category.key}>
                <Accordion label={category.label}>
                  <Grid container spacing={0}>
                    {winetricks[category.key as keyof Winetricks].map(
                      (item) => (
                        <Grid item xs={4}>
                          <Checkbox
                            name={name}
                            label={item.verb}
                            value={item}
                            checked={helpers.isChecked(item)}
                            onChange={(event) => {
                              props.onChange(event);
                              props?.onChange?.(event);
                            }}
                            onBlur={props.onBlur}
                          />
                        </Grid>
                      ),
                    )}
                  </Grid>
                </Accordion>
              </Box>
            ))}
          </Stack>
        </SkeletonLoader>
      )}
    />
  );
};
