import { makeStyles } from '@material-ui/styles';
const classStyles = makeStyles({
  container: {
    backgroundColor: '#a5e7f861',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  miniContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flex: 1,
    alignItems: 'center',
  },

  divSearch: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    flexWrap:'wrap'
  },

  buttonPotvrdi: {
    display: 'flex',
    margin: '15px',
    backgroundColor: '#2e7d32',
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
});
export default classStyles;
