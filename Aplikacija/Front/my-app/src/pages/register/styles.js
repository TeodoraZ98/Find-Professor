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
  divRegistracija: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '300px',
  },
});

export default classStyles;
