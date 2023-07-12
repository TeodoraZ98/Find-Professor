import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating(props) {
  const [value, setValue] = React.useState(2);
  const { setOcena } = props;

  useEffect(() => {
    setOcena(value);
  }, [value]);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        width: '200px',
        webkitBoxAlign: 'center',
      }}
    >
      <label component="legend">Oceni: </label>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ color: ' #2fcd3b' }}
      />
    </Box>
  );
}
