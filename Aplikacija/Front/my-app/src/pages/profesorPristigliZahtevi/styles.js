import { makeStyles } from '@material-ui/styles';
const classStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#a5e7f861',
  },
  header:{
    display: 'flex',
    width: '100%'
  },
  zahteviPristigli:{
     display:'flex',
     flexDirection:'row',
     flexWrap:'wrap'
  }, 
  zahteviPrihvaceni:{
     display:'flex',
     flexDirection:'row',
     flexWrap:'wrap'                                           
  },
  divButton:{
     display:'flex',
     flexDirection:'row',
  }, 
  miniPrikaz:{
     display:'flex', 
     flexDirection:'column',                                          
  },
  divpristigli:{
      display:'flex',
     flexDirection:'column',
     marginTop:'10px'                                            
  }
});

export default classStyles;