import React, { useEffect } from 'react';
import classStyles from './styles';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Opis from './components/bio';
import CenaPoSatu from './components/cenaPoSatu';
import Button from '@mui/material/Button';
import Grad from './components/grad';
import Oblast from './components/oblast';
import Adresa from './components/adresa';
import { Hidden } from '@mui/material';

const checkInput = value => (value.length > 1 ? true : false);
const check=value=>(value>1?true:false)
const Registracija = props => {
  const { setFormNumber, formNumber } = props;
  const {
    cenaPoSatu,
    setCenaPoSatu,
    opis,
    setBio,
    adresa,
    setAdresa,
    grad,
    setGrad,
    oblast,
    setOblast,
    profesor,
  } = props;

  const [allValid, setAllValid] = React.useState(false);
  const classes = classStyles();

  useEffect(() => {
    if (checkInput(adresa) && checkInput(grad) && check(cenaPoSatu)&& checkInput(oblast)) setAllValid(true);
    else setAllValid(false);
  }, [adresa, grad, cenaPoSatu,oblast]);

  const nastaviOnClick = () => {
    setFormNumber(formNumber + 1);
  };

  const nazadOnClick = () => {
    setFormNumber(formNumber - 1);
  };

  return (
    <div className={classes.container}>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <div>
          <Paper className={classes.paper}>
            <Adresa adresa={adresa} setAdresa={setAdresa} />
            <Grad grad={grad} setGrad={setGrad} />

            {profesor ? (<Opis opis={opis} setBio={setBio} />) : null}
            {profesor ? (<CenaPoSatu cenaPoSatu={cenaPoSatu}setCenaPoSatu={setCenaPoSatu}/>) : null}
            {profesor ? (<Oblast oblast={oblast}setOblast={setOblast}/>) : null}
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
                onClick={nastaviOnClick}
                style={{ backgroundColor: 'rgb(1 159 220)' }}
                disabled={!allValid}
              >
                Nastavi
              </Button>
            </div>
          </Paper>
        </div>
      </Slide>
    </div>
  );
};
export default Registracija;
