import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import classStyles from './styles';
import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

export default function CardPrihvaceneUsluge(props) {
      const{P2,id, ime, prezime, korisnickoIme, brTelefona, email, grad, napomena, idProfesora, ucenikId,begin,end}=props;
      // const navigate = useNavigate();
      const classes = classStyles();
      // const[data2,setData2]=useState([]);
      const [open, setOpen] = React.useState(false);
      // const[type,setType]=useState('');
      // const label = { inputProps: { 'aria-label': 'Switch demo' } };

      let PocetakDatum=new Date(begin).toLocaleDateString();
      let PocetakVreme = new Date(begin).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'});
      let KrajDatum= new Date(end).toLocaleDateString();
      let KrajVreme = new Date(end).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'})
      // const [scroll, setScroll] = React.useState('paper');
      // const handleClickOpen = scrollType => () => {
      //   setOpen(true);
      //   setScroll(scrollType);
      // };
      // const handleClose = () => {
      //   setOpen(false);
      // };
      const descriptionElementRef = React.useRef(null);
      React.useEffect(() => {
        if (open) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [open]);
      // const[hajd,setHajd]=useState(true)
      // const[f,setChecked]=useState(false);

      const obavljena = async (id) => {
        const TOKEN = localStorage.getItem('token')
        await Axios.put('https://localhost:7138/Usluga/azurirajStatusUsluge?idUsluge=' + id + '&status=3', {},
          {
            headers: { Authorization: `Bearer ${TOKEN}` }
          }).then(
            res => {
    
              console.log(res.data)
              alert('Usluga obavljena!')
              window.location.reload(false)
            }
    
    
          ).catch((error) => {
            alert(error.response.data)
    
          })
      }
  return(

    <div className={classes.miniContainer} >
    <Card sx={{ maxWidth: 600 }} style={{ margin: '25px', borderRadius: '25px', backgroundColor: '#019fdc52' }} >

      <CardContent>
        <Typography color="black" sx={{ fontSize: 30 }} component="div">Zahtev od {ime} {prezime}</Typography>
        <Typography sx={{ fontSize: 25 }} component="div" >Informacije o korisniku: </Typography>
        <Typography variant="body1" > Korisnicko ime: {korisnickoIme}</Typography>
        <Typography variant="body1" > Broj telefona: {brTelefona}</Typography>
        <Typography variant="body1" > Email: {email} </Typography>
        <Typography variant="body1" > Grad: {grad}  </Typography>
        <Typography variant="body1" > Pocetak usluge: {PocetakDatum} u  {PocetakVreme}</Typography>
        <Typography variant="body1" >Kraj usluge: {KrajDatum} u {KrajVreme} </Typography>
        <Typography variant="body1">Napomena: {napomena}</Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        <Typography variant="body1">Stiklirajte ako ste odrzali cas. </Typography>
          <DoneOutlineIcon style={{ color: 'rgb(1 159 220)' }} onClick={() => obavljena(id)} />
        </IconButton>

      </CardActions>

    </Card>
  </div>


);                                           
}