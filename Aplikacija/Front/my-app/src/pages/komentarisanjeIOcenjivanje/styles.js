import { makeStyles } from '@material-ui/styles';
const classStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    
  },

  miniContainer: {
    padding: '0 10% 0 10%',
  },

  divButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  divImeIPrezime: {
    color: '#192f1a',
    display: 'flex',
    marginBottom: 0,
  },

  divProsecnaOcena: {
    display: 'flex',
  },

  sapica: {
    display: 'flex',
  },
  naziv: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: '180px',
    marginTop: '20px',
  },

  divGore: {
    display: 'flex',
    padding: '0 10% 0 10%',
  },
});
export default classStyles;
