import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import classStyles from './styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from '../../components/HeaderPomoc';
import NavbarUcenik from '../headerUcenik';
import NavBarProfesor from '../headerProfesor';

const Login = () => {
  const [usr,setUsr]=useState(false)
  const navigate = useNavigate();
  const classes = classStyles();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatePwd = pass => {
    return pass.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    );
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      alert('Niste uneli validan email!');
      return;
    }

    if (!validatePwd(pwd)) {
      alert(
        'Niste uneli validnu sifru. Lozinka mora da sadrzi: 1 malo slovo, 1 veliko slovo, 1 broj i mora da bude najmanje duzine 8'
      );
      return;
    }

    const DTO = {
      email: email,
      password: pwd,
    };

    fetch('https://localhost:7138/Auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(DTO),
    })
      .then(async res => {
        if (res.ok) {
          res = await res.json();
          localStorage.setItem('token', res.token);
          setUsr(true)
          alert('Uspesno ste se ulogovali!');

        }
        else if(res.status===401)
        {
          alert('Uneli ste losu sifru!!!')
        }
        else if(res.status===501)
        {
          alert('Niste jos prihvaceni od strane admina!!!')
        }
      })
      .catch(err => {
       alert(err.response.data)
        
      });
 
  };
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
  const proveraProfesor=localStorage.getItem('idProfesora')
  const proveraUcenik=localStorage.getItem('idUcenika')
  return (
    <>
    {usr? navigate('/'): 

    (
    <div className='jedan'>
     
      { proveraProfesor ? <NavBarProfesor/> : (proveraUcenik ? <NavbarUcenik/> : <Header/>)} 
    <div className={classes.container}>
      
      <div className='dva' style={{ displey: 'flex', flexDirection: 'column',minHeight:'675px' }}>
        <h1 style={{ color: '#000000c2' }} className={classes.naslov}>
          Logovanje
        </h1>
        <div>
          <div className={classes.glavni}>
            <TextField
              label="Email"
              type="text"
              variant="outlined"
              autoComplete="off"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
              style={{ marginBottom: '20px', backgroundColor: 'white' }}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Potvrdite lozinku
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                style={{ marginBottom: '20px', backgroundColor: 'white' }}
                label="Lozinka"
                type={values.showPassword ? 'text' : 'password'}
                variant="outlined"
                onChange={e => setPwd(e.target.value)}
                value={pwd}
                required
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
          </div>

          <div className={classes.divButton}>
            <Button
              style={{ backgroundColor: 'rgb(1 159 220)' }}
              variant="contained"
              color="success"
              onClick={handleLogin}
            >
              Uloguj se
            </Button>

            <Button
              style={{ backgroundColor: 'rgb(1 159 220)' }}
              variant="contained"
              color="success"
              onClick={()=>{navigate('/')}}
            >
              Nazad
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>)}
    </>
  );
};
export default Login;
