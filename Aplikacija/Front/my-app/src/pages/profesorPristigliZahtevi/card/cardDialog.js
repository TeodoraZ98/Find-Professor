import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import classStyles from './styles';
import Typography from '@mui/material/Typography';

const CardDialog = props => {
  // const classes = classStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [rec,setRec]=useState('');


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
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle style={{ color: 'rgb(1 159 220)' }} id="scroll-dialog-title">
        Informacije:
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
        {rec && rec.map((d,index)=>
        (
        <Typography variant="body1" color='black'>
          {index+1 + ". " + d.komentar} 
        </Typography>
          ))}
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
