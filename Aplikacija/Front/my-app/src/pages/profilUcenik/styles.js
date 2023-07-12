import { makeStyles } from '@material-ui/styles';

const classStyles = makeStyles({
  container: {
    displey: 'flex',
    flexDirection: 'row',
    // backgroundImage:'linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)'
    backgroundColor: '#a5e7f861',
    height: '2000px',
  },
  naslov: {
    textAlign: 'center',
    color: 'rgb(1 159 220)',
  },
  naslov2: {
    color: 'rgb(1 159 220)',
  },
  slika: {
    displey: 'flex',
    flexDirection: 'column',
  },
  glavni: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap:'wrap',
    flex: 1,
    backgroundColor: '#a5e7f861'
   
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.4,
    padding: 30,
  },
  tekst: {
    color: 'rgb(1 159 220)',
  },
  divButton: {
    alignItems: 'center',
  },
  divButtonCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default classStyles;
