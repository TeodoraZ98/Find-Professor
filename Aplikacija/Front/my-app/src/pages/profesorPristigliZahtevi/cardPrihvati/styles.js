import { makeStyles } from '@material-ui/styles';

const classStyles = makeStyles({
  miniContainer: {
    display: 'flex',
    flex: 1,
    margin: 5,
    flexDirection: 'row',
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
  divbox:
  {
    display: 'flex',
    flexDirection:'column'
  }
});

export default classStyles;