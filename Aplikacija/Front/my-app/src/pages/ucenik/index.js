
import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import classStyles from './styles';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import NavBar from '../headerUcenik';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Typography from '../../components/Typography';


const Ucenik=(props)=> {
  const {ucenik}=props;
  // const classes = classStyles();
  const [profesor, setProfesor] = useState([]);
  const location=useLocation();
  console.log(location)
  // const[value,setValue]=useState('')
  // const[valuee,setValue1]=useState('')
  const inputProps = {
    step: 300,
  };
  
  const navigate=useNavigate();
  
    const klase = classStyles();
    // const labels = {
    //   0.5: 'Useless',
    //   1: 'Useless+',
    //   1.5: 'Poor',
    //   2: 'Poor+',
    //   2.5: 'Ok',
    //   3: 'Ok+',
    //   3.5: 'Good',
    //   4: 'Good+',
    //   4.5: 'Excellent',
    //   5: 'Excellent+',
    // };
    // const getLabelText=(valueOcena)=> {
    //   return `${valueOcena} Star${valueOcena !== 1 ? 's' : ''}, ${labels[valueOcena]}`;
    // }
    // const [valueOcena, setValueOcena] = React.useState(2);
    // const [hover, setHover] = React.useState(-1);
    //   const valuetext=(value)=> {
    //     return `${value*5}DIN`;
    //   }
    //     const handleChangee = (event, newValuee) => {
    //       setValue1(newValuee);
    //     };
    // const valuetextt=(valuee)=> {
    //   return `${valuee}DIN`;
    // }
    
  
    //   const handleChange = (event, newValue) => {
     
    //     console.log('1')
    // };
    
    const[pocetak,setTajmerOd]=useState('');
    const[kraj,setTajmerDo]=useState('');
    
    const[napomena,setNapomena]=useState('');
   
const Od=()=>
{
  console.log(pocetak)
}
const Do =()=>
{
  console.log(kraj)
}

const ucenikId=ucenik.id;
const posalji_zahtev=async()=>
{
  const TOKEN=localStorage.getItem('token')
if(pocetak>kraj)
{
  alert('Greska kod datuma!')
  return
}
const profesorId=location.state;
console.log(profesor);
  if(profesorId===null){alert('Molimo Vas odaberite profesora!!!')}
  const podaci={
  ucenikId,
  profesorId,
  pocetak,
  kraj,
  napomena,
}
if( napomena==='' || pocetak==='' || kraj==='')
{
  alert('Molimo Vas popunite formu do kraja!!!')
  return
}

 await Axios.post('https://localhost:7138/Usluga/dodajUslugu', podaci,{
    
    headers:{ Authorization: `Bearer ${TOKEN}`
  }
}).then(res=>
    {
    
      console.log(res.data)
      alert('Uspesno ste poslali profesor-u zahtev!!!')
      
    }).catch(err=>
    {
         
          if(err.response.data==='profesor je tada zauzet!')
          {
         alert('profesor je tada zauzet!')
          }
          else if(err.response.status){
            alert(err)
          }
        
        
    })
}

    return (

    <div className={klase.bos}>
<NavBar />

<div className={klase.main}>
   <Paper className={klase.usluga}  >
       <IconButton color='primary'  onClick={()=>{navigate('/professorRoute')}}>
       <ArrowBackIosNewIcon/>
       <Typography variant='h6'color='black' onClick={()=>{navigate('/professorRoute');}}>Nazad</Typography>
       </IconButton>
   <h1 className={klase.naslov}>Kreirajte zahtev</h1>
    <div className={klase.datepicker}>
      <div className={klase.pikeri}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4, md: 4 }}>
       <Grid item xs={6}>
        <TextField 
          id="datetime-local"
          label="Pocetak usluge"
          type="datetime-local"
          onChange={e=>setTajmerOd(e.target.value)}
          value={pocetak}
          onClick={Od}
          InputLabelProps={{
            shrink: true,
          }}
        />
       </Grid>  
      <Grid item xs={6}>
      <TextField 
        id="datetime-local"
        label="Kraj usluge"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        onChange={e=>setTajmerDo(e.target.value)}
        onClick={Do}
        value={kraj}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid> 
    </Grid>
    </div>
     </div>
    
    <div className={klase.napomena}>
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField style={{width:'300px'}} id='outlined-multiline-static'label='Napomena' type="text" multiline maxRows={4} inputProps={inputProps} value={napomena} onChange={e=>setNapomena(e.target.value)}/>
     </Box>
     </div>
     <div className={klase.dugme}>
     <Button variant="contained" onClick={()=>{posalji_zahtev();}} endIcon={<SendIcon />} style={{borderRadius:'50px',backgroundColor:'rgb(1 159 220)',color:'black'}}>
      Prosledi zahtev profesoru
     </Button>
     </div>
    </Paper>
    </div>
     </div>
 
  );
}
export default Ucenik

