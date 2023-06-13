import { Typography } from '@mui/material';

type Props = {
  color?: 'primary' | 'secondary' | 'inherit';
  size?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
};

export const Title = ({ color = 'primary', size = 'h1' }: Props) => {
  const shadowConstant = 2;
  const shadowSize = () => {
    switch (size) {
      case 'h1':
        return 10 * shadowConstant;
      case 'h2':
        return 8 * shadowConstant;
      case 'h3':
        return 6 * shadowConstant;
      case 'h4':
        return 5 * shadowConstant;
      case 'h5':
        return 4 * shadowConstant;
      case 'h6':
        return 4 * shadowConstant;
      case 'subtitle1':
        return 2 * shadowConstant;
      default:
        return 1 * shadowConstant;
    }
  };

  return (
    <Typography
      align="center"
      color={color}
      component="h1"
      fontWeight={700}
      sx={{
        filter: `hue-rotate(20deg) drop-shadow(${shadowSize()}px ${shadowSize()}px ${shadowSize()}px red)`,
      }}
      variant={size}
    >
      Sensing Sugar
    </Typography>
  );
};
