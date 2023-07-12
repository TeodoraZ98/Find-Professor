import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
  const { setValues: postaviVrednosti } = props;
  const [values, setValues] = useState('');
  const { naziv } = props;

  const handleChange = event => {
    const unos = event.target.value;

    let isnum = /^\d+$/.test(unos);
    if (isnum || unos == '') {
      setValues(unos);
    }
  };

  const onBlur = event => {
    postaviVrednosti(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        variant="standard"
        label={naziv}
        value={values}
        onChange={handleChange}
        name="numberformat"
        onBlur={onBlur}
      />
    </Box>
  );
}
