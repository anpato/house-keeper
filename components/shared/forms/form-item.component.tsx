import { ComponentProps, FC } from 'react';
import {
  InputLabel,
  OutlinedInput,
  FormControl,
  Input,
  InputAdornmentProps,
  TextFieldProps
} from '@mui/material';

type IProps = {
  value: any;
  label: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  name: string;
  required?: boolean;
  type?: ComponentProps<typeof Input>['type'];
  placeholder: string;
  onChange: (e: any) => void;
  adornment?: any;
  adornmentProps?: InputAdornmentProps;
  fieldProps?: TextFieldProps;
};

const FormItem: FC<IProps> = (props) => {
  return (
    <FormControl variant="outlined" fullWidth={props.fullWidth}>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <OutlinedInput {...props} startAdornment={props.adornment} />
    </FormControl>
  );
};

export default FormItem;
