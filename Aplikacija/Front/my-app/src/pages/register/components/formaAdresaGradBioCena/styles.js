import { makeStyles } from '@material-ui/styles';

const classStyles = makeStyles({
  paper: {
    padding: 20,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  kontrole: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundImage: `url(${slika})`,
    // backgroundSize: 'cover',
    // // backgroundPosition: 'bottom',
    // // flex: 1,
    // width: '100%',
  },
});

export default classStyles;
