import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import classStyles from './styles';
 import CardKomentari from './components/CardKomentari';

const CardDialog = props => {
  const token=localStorage.getItem('token')
  const classes = classStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const { idProfesora } = props;
  const [komentari, postaviKomentar] = useState([]);
const otvori=() => {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
   fetch(
      'https://localhost:7138/Recenzija/vratiRecenzijeZaProfesora?id=' + idProfesora,
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(async res => {
      {console.log(idProfesora)}
      const recenzijeSvihProfesora = await res.json();
      const recenzije = recenzijeSvihProfesora.filter(
        recenzijaProfesora => recenzijaProfesora.profesorId == idProfesora
      );
      postaviKomentar(recenzije);
      {console.log(komentari)}
    });
  };
  const handleClickOpen = scrollType => () => {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div>
      <Button
        style={{ color: 'white', backgroundColor: 'rgb(1 159 220)' }}
        onClick={()=>{setOpen(true);otvori();}}
      >
        Prikazi komentare i ocene
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle style={{ color: 'rgb(1 159 220)' }} id="scroll-dialog-title">
          Odgovor:
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h5 style={{ color: 'black' }}>
              
              {komentari.map((k, index) => {
                return (
              
                  <CardKomentari
                  key={index}
                    id={k.id}
                    vreme={k.vreme}
                    komentar={k.komentar}
                    ocena={k.ocena}
                  />
                );
              })}
            </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'rgb(1 159 220)' }} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CardDialog;
