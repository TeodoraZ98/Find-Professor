import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { useState, useEffect } from 'react';
import { vratiSveGradoveProfesora } from '../../../backendAddress';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {

  const { grad, postaviGrad } = props;

  const handleChange = event => {
    postaviGrad(event.target.value);
  };

  const [gradovi, postaviGradove] = useState([]);

  useEffect(() => {
    
    const TOKEN=localStorage.getItem('token')
    fetch(vratiSveGradoveProfesora,
      {
        headers:{Authorization: `Bearer ${TOKEN}`}
      }).then(async res => {
      const results = await res.json();
      postaviGradove(results);
    });
  }, []);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Grad</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={grad}
          label="grad"
          onChange={handleChange}
        >
          {gradovi.map((name, index) => (
            <MenuItem
              key={index}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
          <MenuItem
            key={'sve'}
            value={'sve'}
          >
            sve
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
