import React, { useState, useEffect} from 'react';
import classStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { adminRoute } from '../../router/routes';
import Card from '../adminUcenici/card/index.jsx';
import Button from '@mui/material/Button';
import BrojeviStranica from '../adminUcenici/brojevi/index.jsx';
import HeaderAdmin from '../../components/HeaderAdmin'
const AdminUcenici = () => {
  const navigate = useNavigate();
  const classes = classStyles();
  const [uceniciKojiSePrikazuju, postaviUcenikeKojiSePrikazuju] = useState([]);
  const [stranica, postaviStranicu] = useState(1);
  const [ukupanBrojStranica, postaviUkupanBrojStranica] = useState(1);
  const [brojObjavaPoStrani, postaviBrojObjavaPoStrani] = useState(2);
  const [ucenici, setUcenici] = useState([]);

  useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    fetch('https://localhost:7138/Ucenik/vratiSveUcenike',
    {
      headers:{ Authorization: `Bearer ${TOKEN}`}
    }).then(async res => {
      const rez = await res.json();
      setUcenici(rez);
      const objave = [];
      if (rez.length > brojObjavaPoStrani) {
        for (let i = 0; i < brojObjavaPoStrani; i++) {
          objave.push(rez[i]);
        }
      } else {
        for (let i = 0; i < rez.length; i++) {
          objave.push(rez[i]);
        }
      }
      postaviUcenikeKojiSePrikazuju(objave);
      if ((rez.length / brojObjavaPoStrani) % 1 != 0) {
        //check if number have decimal places, example: 23 % 1 = 0, 23.5 % 1 = 0.5
        postaviUkupanBrojStranica(Math.ceil(rez.length / brojObjavaPoStrani));
      } else {
        postaviUkupanBrojStranica(rez.length / brojObjavaPoStrani);
      }
    });
  }, []);

  useEffect(() => {
    const objave = [];
    const start = brojObjavaPoStrani * (stranica - 1);
    if (ucenici.length > start + brojObjavaPoStrani) {
      for (let i = start; i < start + brojObjavaPoStrani; i++) {
        objave.push(ucenici[i]);
      }
    } else {
      for (let i = start; i < ucenici.length; i++) {
        objave.push(ucenici[i]);
      }
    }
    postaviUcenikeKojiSePrikazuju(objave);
  }, [stranica]);
  return (
    <div className={classes.container}>
      <HeaderAdmin />
      <div style={{ display: 'flex', marginTop: '30px', marginLeft: ' 850px' }}>
        <Button
          style={{ color: 'white', backgroundColor: 'rgb(1 159 220)' }}
          onClick={() => navigate(adminRoute)}
        >
          Nazad
        </Button>
      </div>
      {uceniciKojiSePrikazuju.map((ucenik, index) => {
        return (
          <Card
            ime={ucenik.ime}
            prezime={ucenik.prezime}
            korisnickoIme={ucenik.korisnickoIme}
            adresa={ucenik.adresa}
            grad={ucenik.grad}
            telefon={ucenik.brTelefona}
            id={ucenik.id}
          />
        );
      })}

      <div className={classes.pagination}>
        <BrojeviStranica
          ukupanBrojStranica={ukupanBrojStranica}
          postaviStranicu={postaviStranicu}
        />
      </div>
      
    </div>
  );
};
export default AdminUcenici;
