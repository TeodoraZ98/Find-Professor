import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import classStyles from './styles';

export default function HoverRating(props) {
  const classes = classStyles();

  const { ocena } = props;
  return (
    <div className={classes.divOcena}>
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography component="legend">Ocena: </Typography>

        <Rating
          style={{ color: '#2fcd3b' }}
          name="read-only"
          value={ocena}
          readOnly
        />
      </Box>
    </div>
  );
}
