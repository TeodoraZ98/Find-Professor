import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Kartica from './kartice/index.jsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { filtrirajProfesore } from '../../backendAddress';
import Gradovi from '../profesor/gradovi';
import Oblasti from '../profesor/oblasti';
import CenaPoSatu from '../profesor/cenaPoSatu';
import ProsecnaOcena from '../profesor/prosecnaOcena';
import BrojeviStranica from '../profesor/broj';
import NavBarUcenik from '../headerUcenik';
import Axios from 'axios'

const Profesor = (props) => {
  // const navigate = useNavigate();
  // const{profesor: profesor}=props;
  const classes = classStyles();
  const [profesori, postaviProfesore] = useState([]);
  const [profesoriKojiSePrikazuju, postaviProfesoreKojiSePrikazuju] = useState([]);
  const [stranica, postaviStranicu] = useState(1);
  const [ukupanBrojStranica, postaviUkupanBrojStranica] = useState(1);
  const [brojObjavaPoStrani, postaviBrojObjavaPoStrani] = useState(5);
  const [grad, postaviGrad] = useState('');
  const [oblast, postaviOblast] = useState('');
  const [Ocena, postaviOcenu] = useState('');
  const [cenaOd, postaviCenuOd] = useState('');
  const [cenaDo, postaviCenuDo] = useState('');
  const [logovan,setLogovan]=useState('')
  const[handle,setHandle1]=useState('')
  const token=localStorage.getItem('token')
  useEffect(()=>
  {
    async function vrati(){
    const TOKEN=localStorage.getItem('token')
    await Axios.get('https://localhost:7138/Auth/vratiTrenutnogKorisnika',
    {
      headers:{ Authorization: `Bearer ${TOKEN}`
  }}).then(res=>
    {
       setLogovan(res.data)
       console.log(res.data.id)
       setHandle1(!handle)
    })}
    vrati()
  },[])
  useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    fetch(filtrirajProfesore,
      {
        headers:{Authorization: `Bearer ${TOKEN}`}
      }).then(async res => {
      const results = await res.json();
      postaviProfesore(results);

      const objave = [];
      if (results.length > brojObjavaPoStrani) {
        for (let i = 0; i < brojObjavaPoStrani; i++) {
          objave.push(results[i]);
        }
      } else {
        for (let i = 0; i < results.length; i++) {
          objave.push(results[i]);
        }
      }
      postaviProfesoreKojiSePrikazuju(objave);

      if ((results.length / brojObjavaPoStrani) % 1 != 0) {
        //check if number have decimal places, example: 23 % 1 = 0, 23.5 % 1 = 0.5
        postaviUkupanBrojStranica(
          Math.ceil(results.length / brojObjavaPoStrani)
        );
      } else {
        postaviUkupanBrojStranica(results.length / brojObjavaPoStrani);
      }
    });
  }, []);

  useEffect(() => {
    const objave = [];
    const start = brojObjavaPoStrani * (stranica - 1);
    if (profesori.length > start + brojObjavaPoStrani) {
      for (let i = start; i < start + brojObjavaPoStrani; i++) {
        objave.push(profesori[i]);
      }
    } else {
      for (let i = start; i < profesori.length; i++) {
        objave.push(profesori[i]);
      }
    }
    postaviProfesoreKojiSePrikazuju(objave);
  }, [stranica]);

  const buttonPotvrdiOnCLick = () => {
    const city = grad !== 'sve' ? grad : ' ';
    const predmet = oblast !== 'sve' ? oblast : ' ';
    console.log(city);
    const TOKEN=localStorage.getItem('token')
    fetch(
      'https://localhost:7138/Profesor/filterProfesori?grad=' +
        city +
        '&minCena=' +
        cenaOd +
        '&maxCena=' +
        cenaDo +
        '&minOcena=' +
        Ocena +
        '&oblast='+
        predmet
    ,
    {
      headers:{Authorization:`Bearer ${TOKEN}`}
    }).then(async res => {
      const results = await res.json();

      postaviProfesore(results);

      const objave = [];
      if (results.length > brojObjavaPoStrani) {
        for (let i = 0; i < brojObjavaPoStrani; i++) {
          objave.push(results[i]);
        }
      } else {
        for (let i = 0; i < results.length; i++) {
          objave.push(results[i]);
        }
      }
      postaviProfesoreKojiSePrikazuju(objave);

      if ((results.length / brojObjavaPoStrani) % 1 != 0) {
        //check if number have decimal places, example: 23 % 1 = 0, 23.5 % 1 = 0.5
        postaviUkupanBrojStranica(
          Math.ceil(results.length / brojObjavaPoStrani)
        );
      } else {
        postaviUkupanBrojStranica(results.length / brojObjavaPoStrani);
      }
    });
  };
  console.log(props);


  return (
    <div className={classes.container}>
      <NavBarUcenik />
      <div className={classes.divSearch}>
        <Gradovi grad={grad} postaviGrad={postaviGrad} />
        <CenaPoSatu naziv="Cena od" setValues={postaviCenuOd} />
        <CenaPoSatu naziv="Cena do" setValues={postaviCenuDo} />
        <ProsecnaOcena Ocena={Ocena} postaviOcenu={postaviOcenu} />
        <Oblasti oblast={oblast} postaviOblast={postaviOblast} />
        <Button
          className={classes.buttonPotvrdi}
          style={{ backgroundColor: 'rgb(1 159 220)', margin: 15 }}
          variant="contained"
          color="success"
          onClick={buttonPotvrdiOnCLick}
        >
          Potvrdi
        </Button>
      </div>
      <div className={classes.miniContainer}>
        {profesoriKojiSePrikazuju.map((profesor, index) => {
          return (
            <Kartica
              ime={profesor.ime} 
              prezime={profesor.prezime}
              email={profesor.email}
              korisnickoIme={profesor.korisnickoIme}
              lozinka={profesor.lozinka}
              opis={profesor.opis}
              slika={profesor.slika}
              brTelefona={profesor.brTelefona}
              grad={profesor.grad}
              adresa={profesor.adresa}
              cenaPoSatu={profesor.cenaPoSatu}
              prosecnaOcena={profesor.prosecnaOcena}
              oblast={profesor.oblast}
              key={index}
              id={profesor.id}
            />
          );
        })}
      </div>
      <div className={classes.pagination}>
        <BrojeviStranica
          ukupanBrojStranica={ukupanBrojStranica}
          postaviStranicu={postaviStranicu}
        />
      </div>
    </div>
  );
};

export default Profesor;
