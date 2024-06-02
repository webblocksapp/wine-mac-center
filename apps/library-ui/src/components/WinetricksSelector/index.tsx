import { Grid } from 'reactjs-ui-core';
import { Checkbox } from 'reactjs-ui-form-fields';

export interface WinetricksSelectorProps {}

export const WinetricksSelector: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Checkbox label="X" />
      </Grid>
    </Grid>
  );
};
