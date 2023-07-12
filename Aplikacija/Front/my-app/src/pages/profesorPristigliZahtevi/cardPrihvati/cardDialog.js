import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import classStyles from './styles';
import Axios from 'axios';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

const CardDialog = props => {
  const classes = classStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [rec,setRec]=useState('');
  const[f,setChecked]=useState(false);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const {  idProfesora, ucenikId, id, napomena} = props;
  const obavljena=async (props)=>
    {
      const TOKEN=localStorage.getItem('token')
       await Axios.put('https://localhost:7138/Usluga/azurirajStatusUsluge?idUsluge=' + props + '&status=3',{},
        {
    headers:{ Authorization: `Bearer ${TOKEN}`}
        }).then(
            res=>
            {
                console.log('Uspesno obavljena usluga xd')
                alert('Cekirali ste da ste gotovi sa uslugom!')
                
            }
            )
        }
   const[hajd,setHajd]=useState(true)


  const handleClickOpen = scrollType => () => {
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
      style={{ color: 'white', backgroundColor: 'rgb(1 159 220)', borderRadius: '20px' , marginLeft:'20px'}}
      onClick={handleClickOpen('paper')}
    >
      Promeni status usluge
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle style={{ color: 'rgb(1 159 220)' }} id="scroll-dialog-title">
        Potvrdite da je cas obavljen.
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
        
        <div className='svecek' style={{marginTop:'15px',textAlign:'center'}}  hidden={!hajd}>
          <Typography variant='h6' color='black'>Usluga izvrsena?</Typography>
        <div className='cekirano' style={{display:'flex',justifyContent:'center'}}>

        <Typography paragraph>Nije izvrsena</Typography>
        <Switch {...label} checked={f} onClick={()=>{setChecked(!f);obavljena(id);setHajd(!hajd)}} color="secondary" name='jason'/>
        <Typography paragraph>Izvrsena</Typography>
        </div>
        </div>
        <div className={classes.divbox} hidden={hajd}>
       
      <Button style={{color: 'white', backgroundColor: 'rgb(1 159 220)' }} onClick={()=>{}}>Potvrdi</Button>
    </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button style={{color: 'white', backgroundColor: 'rgb(1 159 220)' }} onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};
export default CardDialog;
