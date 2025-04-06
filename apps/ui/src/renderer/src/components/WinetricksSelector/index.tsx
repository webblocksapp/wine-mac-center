import { Winetricks } from '@interfaces/Winetricks';
import { useWinetrickModel } from '@models/useWinetrickModel';
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
  { key: 'settings', label: 'Settings' }
];

export const WinetricksSelector: React.FC<WinetricksSelectorProps> = ({
  name,
  control,
  fieldOptions,
  value
}) => {
  const winetrickModel = useWinetrickModel();
  const { loaders, winetricks } = useSelector(winetrickModel.selectWinetrickState);

  useEffect(() => {
    winetrickModel.listAll();
  }, []);

  return (
    <SkeletonLoader loading={loaders.listingAll}>
      <Stack spacing={1}>
        {CATEGORIES.map((category, index) => (
          <Box key={index}>
            <Accordion label={category.label}>
              <Field
                control={control}
                fieldOptions={fieldOptions}
                as="checkbox-group"
                name={name}
                value={value}
                render={(field) => (
                  <Grid container spacing={0}>
                    {winetricks[category.key as keyof Winetricks].map((winetrick, index) => (
                      <Grid key={index} item xs={4}>
                        <Checkbox
                          name={name}
                          label={winetrick.verb}
                          value={winetrick.verb}
                          checked={field.helpers.isChecked(winetrick.verb)}
                          onChange={(event) => {
                            field.props.onChange(event);
                          }}
                          onBlur={field.props.onBlur}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              />
            </Accordion>
          </Box>
        ))}
      </Stack>
    </SkeletonLoader>
  );
};
