import React, {useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classStyles from './styles';
import Modal from '@mui/material/Modal';

export default function CardKomentari(props) {
  const { id, vreme, komentar, ocena } = props;
  console.log('CardKomentar')
  const classes = classStyles();
  const [obrisiKomentar, setObrisiKomentar] = useState([]);

  const obrisi = () => {
    const TOKEN=localStorage.getItem('token')
    fetch(
      'https://localhost:7138/Recenzija/obrisiRecenziju?idRecenzija=' + id,
      {
        method: 'DELETE',
        headers:{Authorization:`Bearer ${TOKEN}`}
      }
    ).then(async response => {
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setObrisiKomentar(res);
        window.location.reload(false)
      } else {
        alert('greska');
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
  const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
  return (
    <div className={classes.miniContainer}>
      
      <Card
        style={{
          display: 'flex',
          margin: 10,
          width: '500px',
          borderRadius: '30px',
          backgroundColor: 'rgb(214 246 209)',
          border: '1px solid rgb(1 159 220)',
          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Typography
            color="rgb(1 159 220)"
            sx={{ fontSize: 25 }}
            component="div"
            gutterBottom
          ></Typography>
          <Typography sx={{ fontSize: 18 }}>Vreme ocenjivanja: {vreme}</Typography>
          <Typography sx={{ fontSize: 18 }}>Ocena: {ocena}</Typography>
          <Typography sx={{ fontSize: 18 }}>Komentar: {komentar}</Typography>
        </CardContent>
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            marginBlockEnd: '5px',
          }}
        >
          <Button
            onClick={()=>{handleOpenModal();}}
            style={{
              color: 'white',
              backgroundColor: 'rgb(1 159 220)',
            }}
          > Obrisi
          </Button>
           <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
           Da li zaiste zelite da obrisete ovu recenziju?
          </Typography>
                  <button type='button' className="btn btn-primary" onClick={()=>{obrisi();}} >Potvrdi</button>
        <button type='button' className="btn btn-outline-primary ms-1" onClick={handleCloseModal} >Zatvori</button>
                
        </Box>
      </Modal>
        </div>
      </Card>
    </div>
  );
}
