import classStyles from './styles';
import BookIcon from '@mui/icons-material/Book';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import CardDialog from './cardDialog';
import Header from '../../components/HeaderPomoc';
import HeaderAdmin from '../../components/HeaderAdmin';
import NavBarProfesor from '../headerProfesor';
import NavBarUcenik from '../headerUcenik';


const Help = () => {
  const classes = classStyles();
  // const navigate = useNavigate();
  const proveraProfesor=localStorage.getItem('idProfesora')
  const proveraUcenik=localStorage.getItem('idUcenika')
  const proveraAdmin=localStorage.getItem('idAdmina')

  return (
    <div className={classes.container}>
{ proveraProfesor ? <NavBarProfesor/> : (proveraUcenik ? <NavBarUcenik/>  :(proveraAdmin ? <HeaderAdmin/> : <Header/>))} 
      {/* <div className={classes.divSlika}> */}
        {/* <div className={classes.divSlika}></div> */}
        <div className={classes.divNaslov}>
          <h1 className={classes.naslov}> Findprofessor pomoć</h1>
          <h3 className={classes.naslov}>
            Ovde mozete naći odgovore na najčešće pitanja
          </h3>
        </div>
      {/* </div> */}
      <div className={classes.miniContainer}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4, md: 4 }}>
          <Grid item xs={6}>
            <div className={classes.divSlika}>
              <BookIcon />
              <CardDialog
                tekstButton={'Kako da postanem profesor ili ucenik na sajtu FindProfessor?'}
                opis={
                  'Da bi na sajtu findprofessor postali profesor ili ucenik potrebno je da se registrujete, na taj nacin ste kreirali vas nalog, ukoliko ste profesor morate i sacekati da vas admin prihvati a ako ste ucenik mozete odmah poceti sa pronalazenjem vaseg idealnog profesora'
                }
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.divSlika}>
              <BookIcon />
              <CardDialog
                tekstButton={'Zašto bi trebalo da postanem profesor?'}
                opis={
                  'Ukoliko smatras da si dovoljno strucan u odredjenoj oblasti i zelis da svoje znanje podelis sa drugima a da pritom zaradis dodatan novac!'
                }
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.divSlika}>
              <BookIcon />
              <CardDialog
                tekstButton={
                  'Kako da pošaljem zahtev profesoru?'
                }
                opis={
                  'Ukoliko ste ucenik i zelite da Vam profesor odrzi cas potrebno je odabrati profesor-a po želji,a nakon toga je potrebno popuniti formu za zahteve i poslati je profesor-u.'
                }
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.divSlika}>
              <BookIcon />
              <CardDialog
                tekstButton={'Kako mogu da komentarišem profesora?'}
                opis={
                  'Posle (ne)uspesno zavrsene usluge profesor ce obeleziti da je odredjena usluga gotova, kada profesor obelezi da je zavrsio sa uslugom ucenik moze komentarisati i oceniti profesor-a. '
                }
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.divSlika}>
              <BookIcon />
              <CardDialog
                tekstButton={'Kako da izmenim sliku na svom profilu?'}
                opis={
                  'Kada se nalazite na stranici svog profila, klikom na dugme Dodaj sliku možete da odaberete sliku iz Vašeg računara.'
                }
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.divSlika}>
              <BookIcon />
              <CardDialog
                tekstButton={'Kako da promenim podatke na svom profilu?'}
                opis={
                  'Kada se nalazite na stranici svog profila, klikom na dugme Izmeni podatke možete da izmenite podatke po želji.'
                }
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Help;
