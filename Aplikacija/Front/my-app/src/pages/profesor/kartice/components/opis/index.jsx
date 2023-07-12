import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import classStyles from './style';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import { komentarisanjeIOcenjivanjeRoute } from '../../../../../router/routes';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;
  const { brTelefona } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            // color: theme => theme.palette.grey[500],
            color: 'rgb(1 159 220)',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const token=localStorage.getItem('token')
  const classes = classStyles();
  const [open, setOpen] = React.useState(false);
  const {
    opis,
    oblast,
    email,
    prezime,
    korisnickoIme,
    lozinka,
    brTelefona,
    grad,
    prosecnaOcena,
    adresa,
    cenaPoSatu,
    id,
  } = props;

  const [com, setCom] = useState('');
  const komentari = async (props) => {
    const TOKEN=localStorage.getItem('token')
    await Axios.get(
      'https://localhost:7138/Recenzija/vratiRecenzijeZaProfesora?id=' + props
    ,{
      headers:{Authorization:`Bearer ${TOKEN}`}
    }).then(res => {
      console.log(res.data);
      setCom(res.data);
    });
  };
  const handleClickOpen = () => {
    const TOKEN=localStorage.getItem('token')
    if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          handleClickOpen();
          komentari(id);
        }}
        size="small"
        style={{backgroundColor:'rgb(1 159 220)'}}
      >
        Pogledaj profesora
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Informacije o profesoru
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Opis profesora:</Typography>
          <Typography gutterBottom>{opis}</Typography>
          <Typography gutterBottom>Broj telefona : {brTelefona}</Typography>
          <Typography gutterBottom>Grad : {grad}</Typography>
          <Typography gutterBottom>Adresa : {adresa}</Typography>
          <Typography gutterBottom>Cena po satu: {cenaPoSatu}</Typography>
          <Typography gutterBottom>Oblast: {oblast}</Typography>
          <Typography gutterBottom>Prezime: {prezime}</Typography>

          <div className={classes.divButton}>
            <Button
              style={{
                backgroundColor: 'rgb(1 159 220)',
                color: 'white',
              }}
              onClick={() => {
                navigate(komentarisanjeIOcenjivanjeRoute,{state:id});
              }}
            >
              Vidi recenzije o profesoru
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{ color: 'rgb(1 159 220)' }}>
            Zatvori
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
