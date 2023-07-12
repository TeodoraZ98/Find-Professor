import React, { useEffect, useState } from 'react';

import classStyles from './styles';

import FormaTipKorisnika from './components/formaTipKorisnika';
import FormaImePrezBrTelefona from './components/formaImePrezBrTel';
import FormaUsernameEmailSifra from './components/formaUsernameEmailSIfra';
import FormaAdresaGradBioCena from './components/formaAdresaGradBioCena';
import FormaGradAdresa from'./components/formaGradAdresa';
import FormaZavrsiRegistraciju from './components/formaZavrsiRegistraciju';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/HeaderPomoc';

import NavbarUcenik from '../headerUcenik';
import NavBarProfesor from '../headerProfesor';
const Registracija = () => {
  const classes = classStyles();
  const navigate = useNavigate();
  const [formNumber, setFormNumber] = useState(0);

  //FormaTipKorisnika
  const [profesor, setProfesor] = useState(true); //true profesor, false ucenik

  //FormaImePrezBrTel
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [brTelefona, setBrojTelefona] = useState('');

  //FormaUsernameEmailSifra
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');
  const [email, setEmail] = useState('');

  //FormaAdresaGradBioCena
  const [adresa, setAdresa] = useState('');
  const [grad, setGrad] = useState('');
  const [opis, setBio] = useState('');
  const [cenaPoSatu, setCenaPoSatu] = useState(0);
  const [oblast, setOblast] = useState('');

  const [zavrsiRegistraciju, setZavrsiRegistraciju] = useState(false);

  useEffect(() => {
    if (zavrsiRegistraciju) {
      let DTO = {
        ime: firstName,
        prezime: lastName,
        email: email,
        korisnickoIme: userName,
        lozinka: pwd,
        brTelefona: brTelefona,
        grad: grad,
        adresa: adresa,
        
      };

      if (profesor) {
        DTO = {
          ...DTO,
          opis: opis,
          oblast:oblast,
          cenaPoSatu: cenaPoSatu,
        };
      }
      const urlProfesor = 'https://localhost:7138/Profesor/dodajProfesora';
      const urlUcenik = 'https://localhost:7138/Ucenik/dodajUcenika';
      fetch(profesor ? urlProfesor : urlUcenik, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(DTO),
      }).then(async response => {
        if (response.ok) {
          const res = await response.json();
          navigate('/');
        } else {
          const res = await response.text();
          setZavrsiRegistraciju(false);
          alert(res);
        }
      });
    }
  }, [zavrsiRegistraciju]);
  const proveraProfesor = localStorage.getItem('idProfesora');
  const proveraUcenik = localStorage.getItem('idUcenika');
  return (
    <div className="jedanregister">
      {proveraProfesor ? (
        <NavBarProfesor />
      ) : proveraUcenik ? (
        <NavbarUcenik />
      ) : (
        <Header />
      )}
      <div className={classes.container}>
        <div style={{ minHeight: '675px' }} className={classes.divRegistracija}>
          <h1 style={{ color: '#000000c2', marginTop: 20 }}>Registracija</h1>
          {formNumber === 0 ? (
            <FormaTipKorisnika
              setFormNumber={setFormNumber}
              formNumber={formNumber}
              setProfesor={setProfesor}
            />
          ) : null}
          {formNumber === 1 ? (
            <FormaImePrezBrTelefona
              formNumber={formNumber}
              setFormNumber={setFormNumber}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              brTelefona={brTelefona}
              setBrojTelefona={setBrojTelefona}
            />
          ) : null}
          {formNumber === 2 ? (
            <FormaUsernameEmailSifra
              formNumber={formNumber}
              setFormNumber={setFormNumber}
              userName={userName}
              setUserName={setUserName}
              pwd={pwd}
              setPwd={setPwd}
              matchPwd={matchPwd}
              setMatchPwd={setMatchPwd}
              email={email}
              setEmail={setEmail}
            />
          ) : null}
            {formNumber === 3 && profesor ? (
            <FormaAdresaGradBioCena
              formNumber={formNumber}
              setFormNumber={setFormNumber}
              opis={opis}
              setBio={setBio}
              cenaPoSatu={cenaPoSatu}
              setCenaPoSatu={setCenaPoSatu}
              adresa={adresa}
              setAdresa={setAdresa}
              grad={grad}
              setGrad={setGrad}
              oblast={oblast}
              setOblast={setOblast}
              profesor={profesor}
              // setProfesor={setProfesor}
            />
          ) : null}

          {formNumber === 3 && !profesor ? (
            <FormaGradAdresa
              formNumber={formNumber}
              setFormNumber={setFormNumber}
              // opis={opis}
              // setBio={setBio}
              // cenaPoSatu={cenaPoSatu}
              // setCenaPoSatu={setCenaPoSatu}
              adresa={adresa}
              setAdresa={setAdresa}
              grad={grad}
              setGrad={setGrad}
              // oblast={oblast}
              // setOblast={setOblast}
              // profesor={profesor}
              // setProfesor={setProfesor}
            />
          ) : null}
          {formNumber === 4 ? (
            <FormaZavrsiRegistraciju
              setFormNumber={setFormNumber}
              formNumber={formNumber}
              setZavrsiRegistraciju={setZavrsiRegistraciju}
              zavrsiRegistraciju={zavrsiRegistraciju}
              profesor={profesor}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Registracija;
