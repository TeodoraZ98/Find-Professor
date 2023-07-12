import { makeStyles } from '@material-ui/styles';
const classStyles = makeStyles({
  divSacuvaj: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  divOcena: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
  },

  divKomentar: {
    display: 'flex',
    justifyContent: 'center',
  },

  lbl: {
    display: 'flex',
    flex: 1,
  },
  ocena: {
    display: 'flex',
    flex: '1',
    justifyContent: 'end',
  },
});
export default classStyles;
