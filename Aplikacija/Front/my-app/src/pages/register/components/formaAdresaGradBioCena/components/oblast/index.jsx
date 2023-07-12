import React, { useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const Oblast = props => {
  const [validOblast, setValidOblast] = useState(false);
  const { oblast, setOblast } = props;
  const classes = classStyles();
  const handleChange = event => {
    setOblast(event.target.value);
  };
 
  return (
       <form noValidate className={classes.container}>
        <ValidationTextField
          label="Oblast"
          type="text"
          autoComplete="off"
          onChange={handleChange}
          required
          variant="outlined"
          aria-invalid={validOblast ? 'false' : 'true'}
          value={oblast}
        />
      </form>
  );
};

export default Oblast;
