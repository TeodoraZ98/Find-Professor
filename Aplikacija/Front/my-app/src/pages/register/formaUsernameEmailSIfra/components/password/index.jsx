import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import { ValidationTextField } from './styles';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Password = props => {
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const { pwd, setPwd, matchPwd, setMatchPwd } = props;
  const classes = classStyles();

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  return (
    <>
      <form noValidate className={classes.container}>
        <ValidationTextField
          label="Lozinka"
          type="password"
          onChange={e => setPwd(e.target.value)}
          required
          variant="outlined"
          value={pwd}
          helperText="Mora da sadrzi veliko, malo slovo, specijalni karakter i broj"
        />
      </form>

      <form noValidate className={classes.container}>
        <ValidationTextField
          label="Potvrdite lozinku"
          type="password"
          onChange={e => setMatchPwd(e.target.value)}
          required
          variant="outlined"
          value={matchPwd}
        />
      </form>
    </>
  );
};

export default Password;
