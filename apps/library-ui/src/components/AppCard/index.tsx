import { Card, CardProps } from '@reactjs-ui/core';

export interface AppCardProps extends CardProps {}

export const AppCard: React.FC<CardProps> = ({ ...rest }) => {
  return <Card {...rest}>Ahora</Card>;
};
