import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const Adresa = props => {
  const [validAdresa, setValidAdresa] = useState(false);
  const { adresa, setAdresa } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = adresa;
    setValidAdresa(result);
  }, [adresa]);

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        label="Adresa"
        type="text"
        autoComplete="off"
        onChange={e => setAdresa(e.target.value)}
        required
        variant="outlined"
        aria-invalid={validAdresa ? 'false' : 'true'}
        value={adresa}
        // helperText={'Ime mora da sadrzi vise od 2 karaktera'}
      />
    </form>
  );
};

export default Adresa;
