import { Box, Card, CardProps, Image } from '@reactjs-ui/core';
import { InstallAppButton } from '@components';

export interface AppCardProps extends CardProps {
  appId?: string;
}

export const AppCard: React.FC<AppCardProps> = ({ appId, ...rest }) => {
  return (
    <Card sx={{ width: 200, height: 280, borderRadius: 2 }} {...rest}>
      <Box
        height="100%"
        width="100%"
        p={1}
        display="grid"
        gridTemplateRows="1fr 40px"
        rowGap={'10px'}
      >
        <Image
          src="https://petapixel.com/assets/uploads/2022/08/fdfs19.jpg"
          height="100%"
          style={{
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: 4,
          }}
        />
        <Box display="flex" justifyContent="end">
          <InstallAppButton />
        </Box>
      </Box>
    </Card>
  );
};
