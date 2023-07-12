import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { useState, useEffect } from 'react';
import { vratiSveOblastiProfesora } from '../../../backendAddress';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {

  const { oblast, postaviOblast } = props;

  const handleChange = event => {
    postaviOblast(event.target.value);
  };

  const [oblasti, postaviOblasti] = useState([]);

  useEffect(() => {
    
    const TOKEN=localStorage.getItem('token')
    fetch(vratiSveOblastiProfesora,
      {
        headers:{Authorization: `Bearer ${TOKEN}`}
      }).then(async res => {
      const results = await res.json();
      postaviOblasti(results);
    });
  }, []);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Oblast</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={oblast}
          label="oblast"
          onChange={handleChange}
        >
          {oblasti.map((name, index) => (
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
