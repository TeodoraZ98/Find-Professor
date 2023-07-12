import React, { useState, useEffect } from 'react';
import classStyles from './styles';
import Card from '../admin/components/card/index.jsx';
import { filtrirajProfesore } from '../../backendAddress';
import { vratiSveNevalidneProfesore } from '../../backendAddress';
import Button from '@mui/material/Button';
import BrojeviStranica from '../admin/components/brojevi/index.jsx';
import { adminUceniciRoute } from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../components/HeaderAdmin'
const Admin = () => {
  const token=localStorage.getItem('token')
  const [profesori, postaviProfesore] = useState([]);
  const [dugme, setDugme] = useState([]);
  const [nevalidni, postaviNevalidneProfesore] = useState([]);
  const [success, setSucess] = useState([]);
  const [profesoriKojiSePrikazuju, postaviProfesoreKojiSePrikazuju] = useState([]);
  const [stranica, postaviStranicu] = useState(1);
  const [ukupanBrojStranica, postaviUkupanBrojStranica] = useState(1);
  const [brojObjavaPoStrani, postaviBrojObjavaPoStrani] = useState(3);

  const uradi = () => {
    const TOKEN=localStorage.getItem('token')
    fetch(vratiSveNevalidneProfesore,
      {
        headers:{Authorization:`Bearer ${TOKEN}`}
      }).then(async res => {
      const rez = await res.json();
      postaviNevalidneProfesore(rez);
      setSucess(true);
      setDugme(false);
    });
  };
  const navigate = useNavigate();
  
  useEffect(() => {
    const TOKEN=localStorage.getItem('token')

    fetch(filtrirajProfesore,
      {
        headers:{Authorization: `Bearer ${TOKEN}`}
      }).then(async res => {
      const rezultat = await res.json();
      postaviProfesore(rezultat);
      console.log(rezultat)
      setSucess(false);
      setDugme(true);

      const objave = [];
      if (rezultat.length > brojObjavaPoStrani) {
        for (let i = 0; i < brojObjavaPoStrani; i++) {
          objave.push(rezultat[i]);
        }
      } else {
        for (let i = 0; i < rezultat.length; i++) {
          objave.push(rezultat[i]);
        }
      }
      postaviProfesoreKojiSePrikazuju(objave);

      if ((rezultat.length / brojObjavaPoStrani) % 1 != 0) {
        //check if number have decimal places, example: 23 % 1 = 0, 23.5 % 1 = 0.5
        postaviUkupanBrojStranica(
          Math.ceil(rezultat.length / brojObjavaPoStrani)
        );
      } else {
        postaviUkupanBrojStranica(rezultat.length / brojObjavaPoStrani);
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

  const classes = classStyles();
  const nazad = () => {
    setSucess(false);
    setDugme(true);
  };

  return (
    <>
      {success ? (
        <div className={classes.container}>
      <HeaderAdmin/>
          <div className={classes.divNazad}>
          </div>
          <div style={{marginTop:'50px'}}>
            {nevalidni.map((nevalidan, index) => {
              return (
                <Card
                key={index}
                  ime={nevalidan.ime}
                  prezime={nevalidan.prezime}
                  telefon={nevalidan.brTelefona}
                  grad={nevalidan.grad}
                  adresa={nevalidan.adresa}
                  cenaPoSatu={nevalidan.cenaPoSatu}
                  opis={nevalidan.opis}
                  oblast={nevalidan.oblast}
                  validan={nevalidan.validan}
                  dugme={dugme}
                  idProfesora={nevalidan.id}
                />
              );
            })}
          </div>
          <Button
              style={{ color: 'white', backgroundColor: 'rgb(1 159 220)' }}
              onClick={()=>{nazad();}}
            >
              Nazad
            </Button>
        </div>
      ) : (
        <div className={classes.container}>
         <HeaderAdmin/>

          <div className={classes.divNevalidni}>
            <Button
              style={{
                color: 'white',
                backgroundColor: 'rgb(1 159 220)',
                margin: '10px ',
              }}
              onClick={() => navigate(adminUceniciRoute)}
            >
              Prikaži ucenike
            </Button>
            <Button
              onClick={()=>{uradi();}}
              style={{
                color: 'white',
                backgroundColor: 'rgb(1 159 220)',
                marginRight: '10px',
                margin: '10px ',
              }}
            >
              Nevalidni profesori
            </Button>
          </div>

          {profesoriKojiSePrikazuju.map((profesor, index) => {
            return (
              <Card
              key={index}
                ime={profesor.ime}
                prezime={profesor.prezime}
                korisnicko_ime={profesor.korisnickoIme}
                telefon={profesor.brTelefona}
                grad={profesor.grad}
                adresa={profesor.adresa}
                cenaPoSatu={profesor.cenaPoSatu}
                opis={profesor.opis}
                oblast={profesor.oblast}
                prosecnaOcena={profesor.prosecnaOcena}
                dugme={dugme}
                idProfesora={profesor.id}
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
      )}
    </>
  );
};
export default Admin;
