import { Button as MuiButton } from '@mui/material';

export interface IButtonProps {
  label: string;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  fullWidth?: boolean;
}

const ButtonText = (props: IButtonProps) => {
  return (
    <MuiButton {...props} size='small' disableElevation>
      {props.label}
    </MuiButton>
  );
};

export default ButtonText;
