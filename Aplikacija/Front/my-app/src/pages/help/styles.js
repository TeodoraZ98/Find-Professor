import { makeStyles } from '@material-ui/styles';
import slika from '../../slike/help.jpg';
const classStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  naslov: {
    display: 'flex',
    justifyContent: 'center',
    color: 'rgb(1 159 220)',
    // height: 70px,
    // font-weight: 530
    height:'70px',
   fontWeight:530,
  },

  divSlika: {
    backgroundImage: `url(${slika})`,
    // backgroundSize: 'contain',
    // display: 'flex',
    width: '550px',
    // height: '150px',
  },
  divSlikaVelika: {
    display: 'flex',
    flexDirection: 'row',
  },
  miniContainer: {
    color: 'rgb(1 159 220)',
    display: 'flex',
    flex: 1,
    marginLeft: '50px',
  },
});
export default classStyles;
