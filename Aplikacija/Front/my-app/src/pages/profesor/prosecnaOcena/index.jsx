import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function BasicSelect(props) {
  const { Ocena, postaviOcenu } = props;
  const handleChange = event => {
    postaviOcenu(event.target.value);
  };

  const [prosecnaOcena, postaviProsecnuOcenu] = useState([0,1, 2, 3, 4, 5]);

  return (
    <Box sx={{ minWidth: 170 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Prosecna ocena</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Ocena}
          label="Prosecna ocena"
          onChange={handleChange}
        >
          {prosecnaOcena.map((ocena, index) => {
            return (
              <MenuItem key={index} value={ocena}>
                {ocena}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
