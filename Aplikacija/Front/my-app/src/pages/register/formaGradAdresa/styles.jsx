import { makeStyles } from '@material-ui/styles';

const classStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#D5F4C8',
  },

  paper: {
    padding: 20,
  },

  kontrole: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});

export default classStyles;
