
import { makeStyles } from '@material-ui/styles';
const classStyles = makeStyles(
    {
        datepicker:
        {
           marginTop: '10px',
           marginBottom:'10px'
        },
        naslov:
        {
            justifyContent:'center',
            color:'rgb(1 159 220)'
        },
        saman:
        {
backgroundColor:'blue'
        },
        slider:
        {
            marginLeft:'10px'
        },
        adresa:
        {
            display:'flex',
            width:'inherit',
            justifyContent:'space-evenly',
            marginTop: '10px',
           marginBottom:'10px'
        },
        usluga:
        {   display:'flex',
            flexDirection:'column',
            borderRadius:'30px',
           // backgroundColor:'rgb(1 159 220)',
            width:'650px',
             justifyContent:'center',
             alignItems:'center',
             marginBottom:'10px',
             marginTop:'10px'
            

        },
        vrsta:
        {
            display:'flex'
        },
        pikeri:
        {
            display:'flex',
            flexDirection: 'column',

        },
        main:
        {
            // backgroundColor:'	rgb(32,178,170)',
            backgroundColor: '#a5e7f861',

            justifyContent:'center',
            display:'flex'
        },
        dugme:
        {
            display:'flex',
            marginTop: '10px',
           marginBottom:'10px',
           height:'70px',
          
        },
        selectbox:
        {
            display:'flex',
            marginTop: '10px',
            marginBottom:'10px',
            width:'inherit',
            justifyContent:'space-evenly'
        },
        napomena:
        {
            display:'flex',
            width:'inherit',
            justifyContent:'space-evenly',
            marginTop: '10px',
           marginBottom:'10px'
        }
        
       
    }
)
export default classStyles
