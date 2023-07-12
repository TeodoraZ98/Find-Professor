import { makeStyles } from '@material-ui/styles';
import slika from '../../slike/pozadina.jpg';

const classStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${slika})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    flex: 1,
  },
  divHeader: {
    display: 'flex',
    flex: 1,
  },

  glavni: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: '100px',
  },

  naslov: {
    textAlign: 'center',
  },

  divButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flex: 0.3,
  },

  input: {
    marginBottom: '20px',
  },
});

export default classStyles;
