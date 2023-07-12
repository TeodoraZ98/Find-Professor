import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;

const FirstName = props => {
  const [validFirstName, setValidFirstName] = useState(false);
  const { firstName, setFirstName } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        label="Ime"
        type="text"
        autoComplete="off"
        onChange={e => setFirstName(e.target.value)}
        value={firstName}
        required
        variant="outlined"
        aria-invalid={validFirstName ? 'false' : 'true'}
        helperText={'Ime mora da sadrzi vise od 2 karaktera'}
      />
    </form>
  );
};

export default FirstName;
