import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classStyles from './styles';
import CardDialog from '../cardDialog';
import  Modal  from '@mui/material/Modal';
export default function BasicCard(props) {
  const { ime, prezime, korisnickoIme,adresa,grad, telefon, id } = props;
  const token=localStorage.getItem('token')
  const classes = classStyles();
  const obrisiUcenika = () => {
    const TOKEN=localStorage.getItem('token')
    if(token!==TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    fetch('https://localhost:7138/Ucenik/obrisiUcenika?id=' + id, 
    {  method: 'DELETE',
      headers:{ Authorization: `Bearer ${TOKEN}`}
   } ).then(async response => {
      if (response.ok) {
        const res = await response.json();
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
          <Typography sx={{ fontSize: 20 }}>
            Korisnicko ime: {korisnickoIme}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            Broj telefona: {telefon}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>Grad: {grad}</Typography>
          <Typography sx={{ fontSize: 20 }}>
            Adresa: {adresa}
          </Typography>
        </CardContent>

        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <CardDialog id={id} />
          <Button
            onClick={()=>{handleOpenModal();}}
            style={{
              color: 'white',
              backgroundColor: 'rgb(1 159 220)',
              marginLeft: '10px',
            }}
          >
            Obrisi ucenika{' '}
          </Button>
          <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
           Da li zaiste zelite da obrisete ovog ucenika?
          </Typography>
                  <button type='button' className="btn btn-primary" onClick={()=>{obrisiUcenika();}} >Potvrdi</button>
        <button type='button' className="btn btn-outline-primary ms-1" onClick={handleCloseModal} >Zatvori</button>
                
        </Box>
      </Modal>
        </CardActions>
      </Card>
    </div>
  );
}
