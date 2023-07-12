
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { adminRoute } from "../router/routes";
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

const NavBarProfesor=()=> {
  const[slika,setSlika]=useState('')
  const ajdi=localStorage.getItem('idProfesora')
  useEffect(()=>
  {
    Axios.get('https://localhost:7138/Profesor/vratiProfesoraPoId?id=' + ajdi).then(res=>
    {
      console.log(res.data.slika + 'slika je')
      setSlika(res.data.slika)
    })
  },[])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    // const handleProfileMenuOpen = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

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
    const log_out=()=>
    {
           
            const token=localStorage.removeItem('token')
            navigate('/')
          window.location.reload(false)
            // console.log('Uspesno ste se log autovali')
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
      <MenuItem    src={'https://localhost:7138/StaticFiles/' + slika} onClick={() => navigate(adminRoute)}>Profil</MenuItem>
      <MenuItem onClick={()=>{handleMenuClose();log_out()}}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const slika1='https://localhost:7138/StaticFiles/' + slika
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
     
      <MenuItem onClick={()=>{navigate('./adminRoute')}}>
        <IconButton
          size="large"
         
          color="inherit"
        >
          <Badge color="error">
            <AdminPanelSettingsIcon />
       <Typography > Proveri sve </Typography>
          </Badge>
        </IconButton>
      </MenuItem>
     <MenuItem onClick={()=>{log_out();}}>
     <IconButton
       size="large"
      
       color="inherit"
     >
       <Badge color="error">
         <LogoutIcon />
    <Typography > Log Out</Typography>
       </Badge>
     </IconButton>
   </MenuItem>
</Menu>
  );

  const navigate=useNavigate();
  const log_out_admin=()=>
  {
    // const idUcenika=localStorage.removeItem('idUcenika')
    const token=localStorage.removeItem('token')
    const korisnik=localStorage.removeItem('korisnik')
    const idAdmina=localStorage.removeItem('idAdmina')
    navigate('/')
    console.log('Uspesno ste se log autovali')
    alert('Successful log out')

}
  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar  position='fixed' style={{display:'flex'}}>
        <Toolbar  position='fixed'style={{backgroundColor:'rgb(1 159 220)',display:'flex'}}>
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
            <a href="./">findprofessor</a>
          </h1>
        </div>
        </header>
          
          <Box sx={{ flexGrow: 1,flexShrink:1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <div className="container d-flex justify-content-between align-items-center">
       

        <nav xs={12} md={6} id="navbar" className="navbar">
          <ul style={{display:'flex'}} xs={12} md={6}>
          
            <li  style={{display:'flex'}}>
              
              <IconButton  href='/adminRoute'  style={{display:'flex'}}>
            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
              <Typography style={{color:'white',display:'flex'}} className="nav-link scrollto">
               Proveri sve
              </Typography>
              
              </IconButton>
           </li>

            <li>  
            <IconButton   onClick={()=>{log_out();}} style={{display:'flex'}}>
              <LogoutIcon style={{color:'white'}} />
              <Typography fontSize={14} className="nav-link scrollto"  style={{color:'white',display:'flex'}}>
                Log Out
              </Typography>
              </IconButton>
            </li>
            <div className='upadaj' style={{display:'flex'}}>
          
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

