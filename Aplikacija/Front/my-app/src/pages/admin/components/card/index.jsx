import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classStyles from './styles';
import CardDialog from '../../cardDialog';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

export default function BasicCard(props) {
  const token=localStorage.getItem('token')
  const {
    ime,
    prezime,
    korisnicko_ime,
    telefon,
    grad,
    adresa,
    cenaPoSatu,
    opis,
    oblast,
    validan,
    dugme,
    idProfesora,
  } = props;
  const obrisiProfesora = () => {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    fetch('https://localhost:7138/Profesor/obrisiProfesora?id=' + idProfesora, {
      method: 'DELETE',
    
      headers:{Authorization:`Bearer ${TOKEN}`}
    }).then(async response => {
      if (response.ok) {
        const res = await response.json();
        window.location.reload(false)
      } else {
        alert('greska');
      }
    });
  };

  const uradi = () => {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    fetch('https://localhost:7138/Profesor/prihvatiProfesora?idProfesor=' + idProfesora, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${TOKEN}`
      },
      body: JSON.stringify(idProfesora),
    }).then(async response => {
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        alert('Profesor:' + res.ime + ' ' + res.prezime + ' ' + 'je prihvaćen');
        setDostupan(res);
        window.location.reload(false);
      } else {
        alert('greskaa');
      }
    });
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [dostupan, setDostupan] = useState([]);
  const classes = classStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <div className={classes.miniContainer}>
      <Card
        style={{
          display: 'flex',
          margin: 10,
          width: '650px',
          borderRadius: '30px',

          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Typography
            color="rgb(1 159 220)"
            sx={{ fontSize: 25 }}
            component="div"
            gutterBottom
          >
            {ime} {prezime}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>Korisnicko ime: {korisnicko_ime}</Typography>
          <Typography sx={{ fontSize: 20 }}>Broj telefona: {telefon}</Typography>
          <Typography sx={{ fontSize: 20 }}>Grad: {grad}</Typography>
          <Typography sx={{ fontSize: 20 }}>Adresa: {adresa}</Typography>
          <Typography sx={{ fontSize: 20 }}>Cena po satu: {cenaPoSatu}</Typography>
          <Typography sx={{ fontSize: 20 }}>Opis: {opis}</Typography>
          <Typography sx={{ fontSize: 20 }}>Oblast: {oblast}</Typography>
        </CardContent>

        <div className={classes.divButton}>
          {dugme ? (
            <CardActions style={{ display: 'inherit' }}>
              <CardDialog idProfesora={idProfesora} />
              <Button
                style={{
                  color: 'white',
                  backgroundColor: 'rgb(1 159 220)',
                  marginTop: 20,
                }}
                onClick={()=>{handleOpenModal();}}
              >
                Obrisi profesora{' '}
              </Button>
              <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
           Da li zaiste zelite da obrisete ovog profesora?
          </Typography>
                  <button type='button' className="btn btn-primary" onClick={()=>{obrisiProfesora();}} >Potvrdi</button>
        <button type='button' className="btn btn-outline-primary ms-1" onClick={handleCloseModal} >Zatvori</button>
                
        </Box>
      </Modal>
            </CardActions>
          ) : (
            <CardActions>
              <Button
                style={{ color: 'white', backgroundColor: 'rgb(1 159 220)' }}
                onClick={()=>{uradi();}}
              >
                Prihvati profesora{' '}
              </Button>
            </CardActions>
          )}
        </div>
      </Card>
    </div>
  );
}
