import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/styles';

export const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'yellow',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: '',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
});

const classStyles = makeStyles({
  dugme: {
    backgroundColor: 'blue',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
});

export default classStyles;
