import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import classStyles from './styles';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Password from '../formaUsernameEmailSIfra/components/password/index.jsx';
import UserName from '../formaUsernameEmailSIfra/components/username/index.jsx';
import Email from '../formaUsernameEmailSIfra/components/email/index.jsx';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Registracija = props => {
  const navigate = useNavigate();
  const classes = classStyles();
  const { setFormNumber, formNumber } = props;
  const [allValid, setAllValid] = React.useState(false);

  const { userName, setUserName } = props;
  const { pwd, setPwd } = props;
  const { matchPwd, setMatchPwd } = props;
  const { email, setEmail } = props;

  const nastaviOnClick = () => {
    setFormNumber(formNumber + 1);
  };

  const nazadOnClick = () => {
    setFormNumber(formNumber - 1);
  };

  useEffect(() => {
    if (
      EMAIL_REGEX.test(email) &&
      USER_REGEX.test(userName) &&
      PWD_REGEX.test(pwd) &&
      PWD_REGEX.test(matchPwd) &&
      pwd == matchPwd
    )
      setAllValid(true);
    else setAllValid(false);
  }, [userName, pwd, matchPwd, email]);

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div>
        <Paper className={classes.paper}>
          <Email className={classes.email} email={email} setEmail={setEmail} />
          <UserName user={userName} setUser={setUserName} />
          <Password
            pwd={pwd}
            setPwd={setPwd}
            matchPwd={matchPwd}
            setMatchPwd={setMatchPwd}
          />

          <div className={classes.kontrole}>
            <Button
              className={classes.divButton}
              variant="contained"
              onClick={nazadOnClick}
              style={{ backgroundColor: 'rgb(1 159 220)' }}
            >
              Nazad
            </Button>
            <Button
              variant="contained"
              disabled={allValid ? false : true}
              style={
                !allValid
                  ? { boxShadow: '1px 2px' }
                  : { backgroundColor: 'rgb(1 159 220)' }
              }
              onClick={nastaviOnClick}
            >
              Nastavi
            </Button>
          </div>
        </Paper>
      </div>
    </Slide>
  );
};

export default Registracija;
