import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import classStyles from './styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slide from '@mui/material/Slide';

const Registracija = props => {
  // const navigate = useNavigate();
  const classes = classStyles();
  const { setFormNumber, formNumber, setProfesor } = props;
  const [checked, setChecked] = useState(0);

  const checkBoxOnChange = (ev, number) => {
    if (ev.target.checked) setChecked(number);
    else setChecked(0);
  };

  useEffect(() => {
    if (checked === 1) setProfesor(true);
    else if (checked === 2) setProfesor(false);
  }, [checked]);

  const nastaviOnClick = () => {
    setFormNumber(formNumber + 1);
  };

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div className={classes.divForma}>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom component="div">
            Zdravo, koji je razlog Vaše registracije na sajtu findprofessor?
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  onChange={ev => checkBoxOnChange(ev, 1)}
                />
              }
              label="Profesor"
              disabled={checked === 2 ? true : false}
            />
            <FormControlLabel
              disabled={checked === 1 ? true : false}
              control={
                <Checkbox
                  color="success"
                  onChange={ev => checkBoxOnChange(ev, 2)}
                />
              }
              label="Ucenik"
            />
          </FormGroup>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              disabled={checked === 0 ? true : false}
              style={
                checked === 0
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
