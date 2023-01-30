import { IconButton as MuiIconButton } from '@mui/material';
import { ReactNode } from 'react';

export interface IButtonIconProps {
  children: ReactNode;
  color?:
    | 'default'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  size?: 'small' | 'medium' | 'large' | undefined;
  disabled?: boolean;
}

const ButtonIcon = (props: IButtonIconProps) => {
  return <MuiIconButton {...props}>{props.children}</MuiIconButton>;
};

export default ButtonIcon;
