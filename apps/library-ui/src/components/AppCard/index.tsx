import { Box, Button, Card, CardProps, Image } from '@reactjs-ui/core';

export interface AppCardProps extends CardProps {}

export const AppCard: React.FC<CardProps> = ({ ...rest }) => {
  return (
    <Card sx={{ width: 200, height: 280 }} {...rest}>
      <Box
        height="100%"
        width="100%"
        p={1}
        display="grid"
        gridTemplateRows="1fr 30px"
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
        <Box>
          <Button sx={{ width: 20 }} color="secondary">
            A
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
