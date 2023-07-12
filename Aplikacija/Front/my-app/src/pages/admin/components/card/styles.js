import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const classStyles = makeStyles({
  miniContainer: {
    display: 'flex',
    flex: 1,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  divButton: {
    display: 'flex',
    width: '250px',
    borderRadius: '20px',
    flex: 1,
    justifyContent: 'center',
    display: ' grid',
    marginLeft: '200px',
  },
  divObrisi: {
    display: 'grid',
  },
});

export default classStyles;
