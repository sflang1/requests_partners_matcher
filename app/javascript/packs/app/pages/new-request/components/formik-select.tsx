import React from 'react';
import { useFormikContext } from 'formik';
import { FormControlProps, TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface FormikSelectProps extends FormControlProps {
  name: string
  label: string
  options: Array<{ id, name }>
}


const FormikSelect: React.FC<FormikSelectProps> = ({ name, label, options, ...otherProps }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  return (
    <FormControl {...otherProps}>
      <TextField
        id="outlined-select-currency"
        select
        label={ label }
        value={values[name]}
        onChange={(event) => setFieldValue(name, event.target.value)}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name]}>
        {
          options.map(option => (<MenuItem key={`form-select-${name}-option-${option.id}`} value={option.id}>{option.name}</MenuItem>))
        }
      </TextField>
    </FormControl>
  )
}

export default FormikSelect;