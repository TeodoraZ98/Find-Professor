import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  // const handleChange = prop => event => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <form noValidate className={classes.container}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Lozinka</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={e => setPwd(e.target.value)}
            required
            label="Lozinka"
            variant="outlined"
            value={pwd}
            type={values.showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            Mora da ima bar 8 karaktera i da sadrzi veliko, malo slovo, specijalni karakter i broj
          </FormHelperText>
        </FormControl>
      </form>

      <form noValidate className={classes.container}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Potvrdite lozinku
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Potvrdite lozinku"
            type={values.showPassword ? 'text' : 'password'}
            onChange={e => setMatchPwd(e.target.value)}
            required
            variant="outlined"
            value={matchPwd}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    </>
  );
};

export default Password;
