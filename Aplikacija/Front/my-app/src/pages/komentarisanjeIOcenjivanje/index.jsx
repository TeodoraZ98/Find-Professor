import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Kartice from '../komentarisanjeIOcenjivanje/kartice/index.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { professorRoute } from '../../router/routes';
import { Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import HeaderUcenik from '../headerUcenik/index.js'
const KomentariasnjeIOcenjivanje = props => {
  const location=useLocation();
  console.log(location.state)
  const classes = classStyles();
  const navigate = useNavigate();
const{komentar}=props;
const [profesor, postaviProfesora] = useState([]);
useEffect(() => {
  async function vrati()
  {
  const TOKEN=localStorage.getItem('token')

 await fetch('https://localhost:7138/Profesor/vratiProfesoraPoId?id=' + location.state,
 {
  headers:{ Authorization: `Bearer ${TOKEN}`
}}).then(p=>{console.log(p)
      p.json().then(p=>postaviProfesora(p))
      })}
      vrati();
}, []);
  const [komentari, postaviKomentar] = useState([]);
  // const[menjaj,setMenjaj]=useState('')
  useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    
    fetch(
      'https://localhost:7138/Recenzija/vratiRecenzijeZaProfesora?id=' + location.state,
      {
    headers:{ Authorization: `Bearer ${TOKEN}`}
      }
    ).then(async res => {
      const recenzijeSvihProfesora = await res.json();

      const recenzije = recenzijeSvihProfesora.filter(
        recenzijaProfesora => recenzijaProfesora.profesorId === location.state
      );
      postaviKomentar(recenzije);
    });
  }, []);

  return (<>
    <div className='a' style={{minHeight:'752px',backgroundColor:'#a5e7f861'}}>
      <HeaderUcenik />
    <div className={classes.container}>
      <div className={classes.divGore}>
        <div className={classes.naziv}>
          <h4 className={classes.divImeIPrezime}>
            {
              <Avatar
                className={classes.sapica}
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
              >
                <BookIcon style={{ color: 'white' }} />
              </Avatar>
            }
            {profesor.ime + ' ' + profesor.prezime + ' '}
          </h4>
          <h5 className={classes.divProsecnaOcena}>
            {' '}
            Prosecna ocena: {profesor.prosecnaOcena}
          </h5>
        </div>
        <div className={classes.divButton}>
          <Button
            style={{
              backgroundColor: 'rgb(1 159 220)',
              color: 'white',
              marginRight: ' 100px',
            }}
            onClick={() => {
              navigate(professorRoute);
            }}
          >
            Vrati se nazad
          </Button>
        </div>
      </div>
      <div className={classes.miniContainer}>
        {komentari.map((k, index) => {
          return (
            <Kartice
              vreme={k.vreme}
              komentar={k.komentar}
              ocena={k.ocena}
              key={index}
              ucenikId={k.ucenikId}
              comment={komentar}
            />
          );
        })}
      </div>
    </div>
    </div>
  
    </>
  );
};
export default KomentariasnjeIOcenjivanje;
