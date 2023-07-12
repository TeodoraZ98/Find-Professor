import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Grad from './components/grad';
import Adresa from '../formaAdresaGradBioCena/components/adresa';
import Button from '@mui/material/Button';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;

const Registracija = props => {
  const { setFormNumber, formNumber } = props;
  const classes = classStyles();
  const [allValid, setAllValid] = React.useState(false);
  const { adresa, setAdresa } = props;
  const { grad, setGrad } = props;

  const nastaviOnClick = () => {
    setFormNumber(formNumber + 1);
  };

  const nazadOnClick = () => {
    setFormNumber(formNumber - 1);
  };

  useEffect(() => {
    if (NAME_REGEX.test(adresa) && NAME_REGEX.test(grad)) setAllValid(true);
    else setAllValid(false);
  }, [adresa, grad]);

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div>
        <Paper className={classes.paper}>
          <Adresa adresa={adresa} setAdresa={setAdresa} />
          <Grad grad={grad} setGrad={setGrad} />
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
