
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors'
import Button from '@mui/material/Button';
import Axios from 'axios'
import classStyles from './styles';
// import {createTheme } from '@mui/material/styles';
import { useState,useEffect } from 'react';

const CardSlika=(user) =>{
const {korisnik}=user;
console.log(korisnik.id + 'jajkas')
const[ime,setIme]=useState('')
useEffect(()=>
{
  async function vrati(){
  const TOKEN=localStorage.getItem('token')
  await Axios.get('https://localhost:7138/Profesor/vratiProfesoraPoId?id=' + korisnik.id,{
    headers:{ Authorization: `Bearer ${TOKEN}`}
  }).then(
    res=>
    {
      console.log(res.data.slika)
      setIme(res.data.slika)
    }
  )}
  vrati();
},[])
const [imenoto,setImenoto]=useState('')
useEffect(()=>
{
  async function vrati(){
  const TOKEN=localStorage.getItem('token')
  await Axios.get('https://localhost:7138/Profesor/vratiProfesoraPoId?id=' + korisnik.id,
  {
  headers:{ Authorization: `Bearer ${TOKEN}`}}).then(
    res=>
    {
      console.log(res.data)
      setImenoto(res.data)
    }
  )}
  vrati();
},[])
const name = async()=>
{
  const TOKEN=localStorage.getItem('token')
  await Axios.get('https://localhost:7138/Profesor/vratiProfesoraPoId?id=' + korisnik.id,
  {
    headers:{ Authorization: `Bearer ${TOKEN}`}
  }).then(
    res=>
    {
      console.log(res.data.slika)
      setIme(res.data.slika)
      window.location.reload(false)
    }
  )
}

const [file, setFile] = useState()
function handleChange(event) {
  setFile(event.target.files[0])
}
// let imagePath=null;
// const [ja,setJa]=useState('')
// let ja1=''
// let srcValue = ''
// let base64ImageString=''
const handleSubmit=async(event) =>{
  
  const TOKEN=localStorage.getItem('token')
  // const url = 'http://localhost:3000/uploadFile';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'responseType': 'blob' ,
 'Authorization': `Bearer ${TOKEN}`
    },
  };
  await Axios.post('https://localhost:7138/Profesor/dodajSlikuProfesoru?idProfesor=' + korisnik.id, formData, config).then((response) => {
   
  console.log(response);
    
    setFile(response.data)
    name();
    setKlik(false)
    
  });

}
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });
   const classes = classStyles();
  const[expanded,setExpanded]=useState('')
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
// };
const[klik,setKlik]=useState(false)
const token=localStorage.getItem('token')
const handleClick=()=>
{
  const TOKEN=localStorage.getItem('token')
  if(token!==TOKEN || !TOKEN)
  {
    window.location.reload(false)
    return
  }
  setKlik(!klik)
  setExpanded(!expanded);
}
const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return(
    <><Card sx={{ maxWidth: 345 }} style={{ backgroundColor: '#019fdc52', display: 'grid', marginBottom: '40px', marginTop: '40px', borderRadius: '0px',minWidth:'300px' }}>
     <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={'https://localhost:7138/StaticFiles/'  + ime}>
            
          </Avatar>}
          title={imenoto.ime + " "  + imenoto.prezime}
          subheader={date}
          />
      <CardMedia
        component='img'
        height="400"
        image={'https://localhost:7138/StaticFiles/' + ime}
       />
      <CardActions className={classes.divButtonCard}>
       <Typography variant='h6' style={{marginBottom:'15px'}}>Odaberite sliku</Typography>
      
        <input  style={{display:'flex',textAlignLast:'center'}}type="file"onClick={()=>{handleClick();}} onChange={handleChange} />
          <CardContent>

            <Button
            hidden={!klik}
              style={{ backgroundColor: 'rgb(1 159 220)', color: "black", width: '250px', height: '50px', borderRadius: '0px' }}
              variant="contained"
              color="success"
              type="submit"
              onClick={()=>{handleSubmit();}}
            >
              Potvrdi
            </Button>

          </CardContent>
      </CardActions>
    </Card>
      </>
  );
}
export default CardSlika