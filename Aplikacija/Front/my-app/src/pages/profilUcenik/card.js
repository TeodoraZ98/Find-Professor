import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Axios from 'axios';
import classStyles from './styles';
import { useState,useEffect } from 'react';
const CardSlika = (props) => {
  
  const {loged}=props;
  const token=localStorage.getItem('token')
  const classes = classStyles();
  const[expanded,setExpanded]=useState('')
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
const[slika,setSlika]=useState('')
const [logovan,setLogovan]=useState('')
const[handle,setHandle1]=useState('')
useEffect(()=>
{
  async function fetchData(){
  const TOKEN=localStorage.getItem('token')
 await Axios.get('https://localhost:7138/Auth/vratiTrenutnogKorisnika',
  {
    headers:{ Authorization: `Bearer ${TOKEN}`
}}).then(res=>
  {
     setLogovan(res.data)
     console.log(res.data.id)
     setHandle1(!handle)
  })}
  fetchData();
},[])
useEffect(()=>
{
  async function fetchData(){
  const TOKEN=localStorage.getItem('token')
 await Axios.get('https://localhost:7138/Ucenik/vratiUcenikaPoId?id=' + logovan.id,
  {
    headers:{ Authorization: `Bearer ${TOKEN}`}
  }).then(
    res=>
    {
      console.log(res.data.slika)
      setSlika(res.data.slika)
    }
  )}
  fetchData();
},[handle])
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
  const picture = async()=>
  {
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:7138/Ucenik/vratiUcenikaPoId?id=' + logovan.id,
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(
      res=>
      {
        console.log(res.data.slika)
        setSlika(res.data.slika)
        window.location.reload(false)
      }
    )
  }
  const[namino,setNamino]=useState('')
useEffect(()=>
  {
    async function fetchData(){
    const TOKEN=localStorage.getItem('token')
   await Axios.get('https://localhost:7138/Ucenik/vratiUcenikaPoId?id=' + logovan.id,
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(
      res=>
      {
        console.log(res.data)
        setNamino(res.data)
      }
    )}
    fetchData();
  },[handle])
  
  const [file, setFile] = useState()
function handleChange(event) {
  setFile(event.target.files[0])
}
  const handleSubmit=async(event)=> {
  
    
    const TOKEN=localStorage.getItem('token')
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'responseType': 'blob',
          'Authorization': `Bearer ${TOKEN}`
        
      },
    };
    await Axios.post('https://localhost:7138/Ucenik/dodajSlikuUceniku?idUcenik=' + loged.id, formData, config).then((response) => {
    console.log(response);    
      setFile(response.data)
      picture();
      setKlik(false)
    });
  }
  const[klik,setKlik]=useState(false)
  const handleClick=()=>
  {
    const TOKEN=localStorage.getItem('token')
    if(token!==TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    setKlik(true)
    setExpanded(!expanded);


  }
  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        display: 'grid',
        marginBottom: '40px',
        marginTop: '40px',
        borderRadius: '0px',
        backgroundColor:'#019fdc52'
        // rgb(1 159 220)
      }}
    >   <div className='spoj' style={{display:'flex',justifyContent:'flex-start'}}>
        <CardHeader
          avatar={<Avatar style={{marginRight:'0px'}}sx={{ bgcolor: red[500] }} aria-label="recipe" src={'https://localhost:7138/StaticFiles/'  + slika}>  </Avatar>}
          title={'Ime i prezime:' + namino.ime + ' ' + namino.prezime}
          subheader={'Danasnji datum:' + date}
          >
          </CardHeader>
          </div>
      <CardMedia
        component="img"
        height="194"
        image={
          'https://localhost:7138/StaticFiles/' + slika
        }
      />
      <CardActions className={classes.divButtonCard}>
        <Typography style={{marginBottom:'20px'}}variant='h6'>Odaberite sliku</Typography>
    <input className='inputic' style={{display:'flex',textAlignLast:'center'}}type="file" onClick={handleClick} onChange={handleChange} />
  <CardContent hidden={!klik}>
        <Button
          style={{
            backgroundColor: 'rgb(1 159 220)',
            color: 'black',
            width: '250px',
            height: '50px',
            // borderRadius: '20px',
            color:'black'
          }}
          variant="contained"
          color="success"
          onClick={()=>{handleSubmit();}}
        >
          Potvrdi
        </Button>
        </CardContent>
      </CardActions>
    </Card>
  );
};
export default CardSlika;
