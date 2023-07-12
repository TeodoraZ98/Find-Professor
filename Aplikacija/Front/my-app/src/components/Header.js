
import * as React from 'react';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect} from 'react'
import { profilProfesorRoute} from "../router/routes";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

const Search = styled('div')(({ theme }) => ({

  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const NavBarProfesor = () => {
  const [slika, setSlika] = useState('')
  const ajdi = localStorage.getItem('idProfesora')
  useEffect(() => {
    Axios.get('https://localhost:7138/Profesor/vratiProfesoraPoId?id=' + ajdi).then(res => {
      console.log(res.data.slika + 'slik je')
      setSlika(res.data.slika)
    })
  }, [])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const log_out = () => {
    const idUcenika = localStorage.removeItem('idUcenika')
    const token = localStorage.removeItem('token')
    const korisnik = localStorage.removeItem('korisnik')
    const idProfesora = localStorage.removeItem('idProfesora')
    console.log('Uspesno ste se log autovali')
    alert('Successful log out')

  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleMobileMenuOpen}
    >
      <MenuItem src={'https://localhost:7138/StaticFiles/' + slika} onClick={() => navigate(profilProfesorRoute)}>Profil</MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); log_out() }}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const slika1 = 'https://localhost:7138/StaticFiles/' + slika
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}

    >

      <MenuItem onClick={() => { navigate('./registerRoute') }}>
        <IconButton
          size="large"

          color="inherit"
        >
          <Badge color="error">
            <LogoutIcon />
            <Typography > Zapocni </Typography>
          </Badge>
        </IconButton>
      </MenuItem>

      <MenuItem onClick={() => { navigate('./helpRoute') }}>
        <IconButton
          size="large"

          color="inherit"
        >
          <Badge color="error">
            <HelpOutlineIcon />
            <Typography > Pomoc </Typography>
          </Badge>
        </IconButton>
      </MenuItem>


      <MenuItem onClick={() => { navigate('./loginRoute') }}>
        <IconButton
          size="large"

          color="inherit"
        >
          <Badge color="error">
            <LoginIcon />
            <Typography > Log in </Typography>
          </Badge>
        </IconButton>
      </MenuItem>

      <MenuItem onClick={() => { navigate('./registerRoute') }}>
        <IconButton
          size="large"

          color="inherit"
        >
          <Badge color="error">
            <AppRegistrationIcon />
            <Typography > Registruj se </Typography>
          </Badge>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' style={{ display: 'flex' }}>
        <Toolbar position='fixed' style={{ backgroundColor: 'rgb(1 159 220)', display: 'flex' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}

          >
          </IconButton>
          <header
            id="header"
            className="fixed-top d-flex align-items-center header-transparent"
          >

            <div id="logo">
              <h1>
                <a href="./">FindProfessor</a>
              </h1>
            </div>
          </header>

          <Box sx={{ flexGrow: 1, flexShrink: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div className="container d-flex justify-content-between align-items-center">


              <nav xs={12} md={6} id="navbar" className="navbar">
                <ul style={{ display: 'flex' }} xs={12} md={6}>

                  <li style={{ display: 'flex' }}>

                    <IconButton href="#about" style={{ display: 'flex' }}>

                      <Typography style={{ color: 'white', display: 'flex' }} className="nav-link scrollto">
                        O sajtu
                      </Typography>

                    </IconButton>
                  </li>
                  <li>
                    <IconButton href="#contact" style={{ display: 'flex' }}>
                      <AddLocationAltIcon />
                      <Typography fontSize={14} className="nav-link scrollto" href="#contact" style={{ color: 'white', display: 'flex' }}>
                        Kontakt
                      </Typography>
                    </IconButton>
                  </li>
                  <li>
                    <IconButton href="/helpRoute" style={{ display: 'flex' }}>
                      <HelpOutlineIcon />
                      <Typography fontSize={14} className="nav-link scrollto" href="/helpRoute" style={{ color: 'white', display: 'flex' }}>
                        Pomoć
                      </Typography>
                    </IconButton>
                  </li>
                  <li className="dropdown" style={{ display: 'flex' }} >
                    <IconButton>
                      <Typography style={{ color: 'white', display: 'flex' }} href="/#">
                        <span fontSize={18}>Usluge</span> <i className="bi bi-chevron-down"></i>
                      </Typography>
                    </IconButton>
                    <ul>
                      <li>
                        <a href="#services" >Pronadji najbolje profesore</a>
                      </li>
                      <li>
                        <a href="#services" >Pronalazak profesora iz komfora vaseg doma</a>
                      </li>
                      <li>
                        <a href="#services">Izaberite termin koji vam odgovara</a>
                      </li>
                      <li>
                        <a href="#services" >Pristupacne cene</a>
                      </li>
                    </ul>
                  </li>
                  <div className='upadaj' style={{ display: 'flex' }}>
                    <li>
                      <IconButton href="/loginRoute" style={{ display: 'flex' }}>
                        <Typography className="nav-link scrollto" href="/loginRoute" style={{ color: 'white', fontWeight: 'bolder' }}>
                          Log In
                        </Typography>
                      </IconButton>
                    </li>
                    <li>

                      <IconButton href="/registerRoute" style={{ display: 'flex' }}>
                        <Typography className="nav-link scrollto" href="/registerRoute" style={{ color: 'white', fontWeight: 'bolder' }}>
                          Registruj se
                        </Typography>
                      </IconButton>
                    </li>
                  </div>
                </ul>
              </nav>
            </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default NavBarProfesor

