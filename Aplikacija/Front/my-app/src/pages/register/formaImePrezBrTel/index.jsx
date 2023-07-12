import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import classStyles from './styles';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FirstName from './components/firstName';
import LastName from './components/lastName';
import PhoneNumber from './components/phoneNumber';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const NUMBER_REGEX = /^\d+$/;

const Registracija = props => {
  const { setFormNumber, formNumber } = props;
  const { firstName, setFirstName } = props;
  const { lastName, setLastName } = props;
  const { brTelefona, setBrojTelefona } = props;
  const classes = classStyles();
  const [allValid, setAllValid] = React.useState(false);

  const nastaviOnClick = () => {
    setFormNumber(formNumber + 1);
  };

  const nazadOnClick = () => {
    setFormNumber(formNumber - 1);
  };

  useEffect(() => {
    if (
      NAME_REGEX.test(firstName) &&
      NAME_REGEX.test(lastName) &&
      NUMBER_REGEX.test(brTelefona)
    )
      setAllValid(true);
    else setAllValid(false);
  }, [firstName, lastName, brTelefona]);

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div>
        <Paper className={classes.paper}>
          <FirstName firstName={firstName} setFirstName={setFirstName} />
          <LastName lastName={lastName} setLastName={setLastName} />
          <PhoneNumber
            brTelefona={brTelefona}
            setBrojTelefona={setBrojTelefona}
          />
          <div className={classes.kontrole}>
            <Button
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
