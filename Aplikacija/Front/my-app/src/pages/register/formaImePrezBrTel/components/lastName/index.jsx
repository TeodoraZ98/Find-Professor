import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;

const LastName = props => {
  const [validLastName, setValidLastName] = useState(false);
  const { lastName, setLastName } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        label="Prezime"
        type="text"
        id="validation-outlined-input"
        autoComplete="off"
        onChange={e => setLastName(e.target.value)}
        required
        variant="outlined"
        value={lastName}
        aria-invalid={validLastName ? 'false' : 'true'}
        helperText={'Prezime mora da sadrzi vise od 2 karaktera'}
      />
    </form>
  );
};

export default LastName;
