import React, {useState } from 'react';
import classStyles from './styles';
// import { USER_REGEX } from '../REGEX';
import { ValidationTextField } from './styles';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const Username = props => {
  const [validName, setValidName] = useState(false);
  const { user, setUser } = props;
  const classes = classStyles();

  const checkUsername = () => {
    const result = USER_REGEX.test(user);
    if (!result) {
      setValidName(false);
    } else {
      setValidName(true);
    }
  };

  return (
    <form noValidate className={classes.container}>
      <ValidationTextField
        label="Korisnicko ime"
        type="text"
        autoComplete="off"
        onChange={e => setUser(e.target.value)}
        required
        variant="outlined"
        helperText="Morate uneti od 4 do 24 karaktera"
        onBlur={checkUsername}
        value={user}
      />
    </form>
  );
};

export default Username;
