import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import classStyles from './styles';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CardPristigliZahtevi(props) {
  const { P1, id, ime, prezime, korisnickoIme, brTelefona, email, grad, napomena, begin, end } = props;
  const navigate = useNavigate();
  const classes = classStyles();
  const [data2, setData2] = useState([]);
  const [type, setType] = useState('')
  const token = localStorage.getItem('token')
  let PocetakDatum = new Date(begin).toLocaleDateString();
  let PocetakVreme = new Date(begin).toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });
  let KrajDatum = new Date(end).toLocaleDateString();
  let KrajVreme = new Date(end).toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' })



  const prihvati_uslugu = async (id) => {
    const TOKEN = localStorage.getItem('token')
    await Axios.put('https://localhost:7138/Usluga/azurirajStatusUsluge?idUsluge=' + id + '&status=1', {},
      {
        headers: { Authorization: `Bearer ${TOKEN}` }
      }).then(
        res => {

          console.log(res.data)
          alert('Uspesno ste prihvatili uslugu!')
          window.location.reload(false)
        }


      ).catch((error) => {
        alert(error.response.data)

      })
  }
  const odbij_uslugu = async (id) => {
    const TOKEN = localStorage.getItem('token')
    await Axios.put('https://localhost:7138/Usluga/azurirajStatusUsluge?idUsluge=' + id + '&status=2', {},
      {
        headers: { Authorization: `Bearer ${TOKEN}` }
      }).then(
        res => {
          console.log('Odbijena usluga sa idejem: ' + props)
          alert('Odbili ste ovu uslugu!')
          window.location.reload(false)
        }
      ).catch((err) => {
        alert(err.response.data)
      })
  }

  return (
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

            <DoneOutlineIcon style={{ color: 'rgb(1 159 220)' }} onClick={() => prihvati_uslugu(id)} />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon style={{ color: 'black' }} onClick={() => odbij_uslugu(id)} />
          </IconButton>

        </CardActions>

      </Card>
    </div>
  );
}