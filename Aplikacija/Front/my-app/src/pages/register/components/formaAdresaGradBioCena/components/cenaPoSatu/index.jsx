import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const CenaPoSatu = props => {
  const [validCenaPoSatu, setValidCenaPoSatu] = useState(false);
  const { cenaPoSatu, setCenaPoSatu } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = cenaPoSatu;
    setValidCenaPoSatu(result);
  }, [cenaPoSatu]);

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        label="Cena po satu"
        type="number"
        autoComplete="off"
        onChange={e => setCenaPoSatu(e.target.value)}
        required
        variant="outlined"
        aria-invalid={validCenaPoSatu ? 'false' : 'true'}
        value={cenaPoSatu}
      />
    </form>
  );
};

export default CenaPoSatu;
