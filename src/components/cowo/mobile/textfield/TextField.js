import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextFieldCowo = ({ label, placeholder, type, onChange, multiline }) => (
  <TextField
    label={label}
    placeholder={placeholder}
    InputProps={{
      style: { width: '80vw', color: 'white', borderBottom: '1px solid white' },
      disableUnderline: true,
    }}
    InputLabelProps={{ style: { color: 'white' } }}
    margin="normal"
    type={type === 'password' ? 'password' : 'text'}
    onChange={event => {
      onChange(event.target.value);
    }}
    multiline={multiline}
  />
);

export default TextFieldCowo;
