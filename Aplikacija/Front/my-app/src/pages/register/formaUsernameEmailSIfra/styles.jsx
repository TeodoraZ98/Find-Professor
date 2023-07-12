import { makeStyles } from '@material-ui/styles';
// import slika from '../../../../slike/slika6.jpg';

const classStyles = makeStyles({
  // container: {
  //   backgroundImage: `url(${slika})`,
  // },
  paper: {
    padding: 20,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  email: {
    marginTop: 10,
  },
  divButton: {
    marginRight: '10px',
  },

  kontrole: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});

export default classStyles;
