import React, { useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const Grad = props => {
  const [validGrad, setValidGrad] = useState(false);
  const { grad, setGrad } = props;
  const classes = classStyles();



  const handleChange = event => {
    setGrad(event.target.value);
  };
 
  return (
       <form noValidate className={classes.container}>
        <ValidationTextField
          label="Grad"
          type="text"
          autoComplete="off"
          onChange={handleChange}
          required
          variant="outlined"
          aria-invalid={validGrad ? 'false' : 'true'}
          value={grad}
          // helperText={'Ime mora da sadrzi vise od 2 karaktera'}
        />
      </form>
  );
};

export default Grad;
