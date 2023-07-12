
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login/index.jsx';
import Registracija from '../pages/register/index.jsx';
import Home from '../pages/home/index.jsx';
import Profesor from '../pages/profesor/index.jsx';
import KomentariasnjeIOcenjivanje from '../pages/komentarisanjeIOcenjivanje/index.jsx';
import Ucenik from '../pages/ucenik/index.js';
import ProfilUcenik from '../pages/profilUcenik/index.js';
import Help from '../pages/help/index.jsx';
import Admin from '../pages/admin/index.jsx';
import React from 'react';
import { useState, useEffect } from 'react';
import PristigliZahtevi from '../pages/profesorPristigliZahtevi/index.js';
import UcenikZahtevi from '../pages/ucenikZahtevi/index.js';
import ProfesorProfil from '../pages/profesorProfil/index.js';
import AdminUcenici from '../pages/adminUcenici/index.jsx';
import Axios from 'axios';
import * as routes from './routes';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Box';
import NotFound from './NotFound.js';
import ProfesorTermini from '../pages/profesorTermini/index.js';

const Router = () => {

  const [logovan, setLogovan] = useState('')
  // const [handle, setHandle1] = useState('')
  const [isLoading, setLoading] = useState(true)
  const TOKEN = localStorage.getItem('token')
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await Axios.get('https://localhost:7138/Auth/vratiTrenutnogKorisnika',
        {

          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        }).then(res => {

          setLogovan(res.data)
          setLoading(false)

        }).catch(err => {


          setLoading(false)

        })
    }
    fetchData();

  }, []);


  if (isLoading) {
    return <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh', alignItems: 'center' }}>
      <CircularProgress />
    </Grid>
  }
  else
    return (

      <>

        <BrowserRouter>
          <Routes>
            <Route exact path={routes.loginRoute} element={logovan ? <Navigate to={'/'} /> : <Login />} />
            <Route exact path={routes.registerRoute} element={logovan ? <Navigate to={'/'} /> : <Registracija />} />
            <Route exact path={routes.helpRoute} element={logovan ? <Navigate to={'/'} /> : <Help />} />
            <Route exact path={routes.adminRoute} element={logovan?.tip === 2 ? <Admin /> :
              <Navigate to={'/'} />
               } />
            <Route
              exact
              path={routes.profilUcenikRoute}
              element={logovan?.tip === 0 ? <ProfilUcenik loged={logovan} /> :
                <Navigate to={'/'} />}
            />
            <Route exact path={routes.professorRoute}
              element={
                logovan?.tip === 0 ?
                  <Profesor profesor={logovan} /> :
                  <Navigate to={'/'} />} />
            <Route exact path="/" element={<Home kuca={logovan} />} />
            <Route
              exact
              path={routes.adminUceniciRoute}
              element={logovan?.tip === 2 ? <AdminUcenici /> :
                <Navigate to={'/'} />}
            />
            <Route
              exact
              path={routes.komentarisanjeIOcenjivanjeRoute}
              element={
                logovan?.tip === 0 ?
                  <KomentariasnjeIOcenjivanje komentar={logovan} /> :
                  <Navigate to={'/'} />}
            />
            <Route exact path={routes.ucenikRoute} element={logovan?.tip === 0 ? <Ucenik ucenik={logovan} /> :
              <Navigate to={'/'} />} />
            <Route exact path={routes.profilProfesorRoute} element={logovan?.tip === 1 ? <ProfesorProfil user={logovan} /> :
              <Navigate to={'/'} />} />



            <Route exact path={routes.profesorTerminiRoute} element={logovan?.tip === 1 ? <ProfesorTermini user={logovan} /> :
              <Navigate to={'/'} />} />



            <Route exact path={routes.pristigliZahteviRoute} element={logovan?.tip === 1 ? <PristigliZahtevi pristigli={logovan} /> :
              <Navigate to={'/'} />} />
            <Route exact path={routes.pristigliZahteviUcenikRoute} element={logovan?.tip === 1 ? <UcenikZahtevi /> :
              <Navigate to={'/'} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    );
};

export default Router;
