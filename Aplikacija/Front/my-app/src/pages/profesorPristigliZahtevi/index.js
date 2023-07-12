import React, { useState } from 'react';
import classStyles from './styles';
import Button from '@mui/material/Button';
import NavBar from '../headerUcenik';
import Axios from 'axios';
import NavBarProfesor from '../headerProfesor';
import Typography from '@mui/material/Typography';
import CardPristigliZahtevi from './card/index.js';
import CardPrihvaceneUsluge from './cardPrihvati/index.js';

const PristigliZahtevi=(props)=>
{
  const {pristigli}=props
  const token=localStorage.getItem('token')
  const classes = classStyles();
    const[data1,setData]=useState([])
    const pristigle =async()=>{
   
      const TOKEN=localStorage.getItem('token')
      if(token!==TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
       await Axios.get('https://localhost:7138/Usluga/vratiUslugeProfesoruPoStatusu?idProfesora='+ pristigli.id + '&status=0',
       {
    headers:{ Authorization: `Bearer ${TOKEN}`
    }}).then(
            res=>
            {
              setData(res.data);
            }
        )
      }

const[accept,setAccept]=useState([])
const prihvacene =async()=>
{
  const TOKEN=localStorage.getItem('token')
  
  if(token!==TOKEN || !TOKEN)
  {
    window.location.reload(false)
    return
  }
await Axios.get('https://localhost:7138/Usluga/vratiUslugeProfesoruPoStatusu?idProfesora=' + pristigli.id + '&status=1',
{
headers:{ Authorization: `Bearer ${TOKEN}`
}
}).then(
    res=>{
       
        setAccept(res.data)
    }
)
}
// const odbijene =async()=>
// {
//   const TOKEN=localStorage.getItem('token')
// await Axios.get('https://localhost:7138/Usluga/vratiUslugeProfesoruPoStatusu?idProfesora=' + pristigli.id + '&status=2',
// {
//     headers:{ Authorization: `Bearer ${TOKEN}`
// }}).then(
//     res=>{
//         console.log(res)
//     }
// )
// }
  const [open, setOpen] = React.useState(false);
    const[p1,setP1]=useState(false)
    const[p2,setP2]=useState(false)
    const handlep1=()=>
    {
      setP1(!p1)
    }
    const handlep2=()=>
    {
      setP2(!p2)
    }

    return(
      <div className={classes.container}>
 
        <div className={classes.header}>
          {pristigli.id ? <NavBarProfesor/>:<NavBar />}
        </div>
        <h1 style={{color:'rgb(1 159 220)',marginTop:'20px'}}>Pogledajte zahteve koji su vam pristigli</h1>
        <div className={classes.divButton}>
         <Button  style={{ color: 'white', backgroundColor: 'rgb(1 159 220)', marginRight: '20px' }} onClick={()=>{pristigle();handlep1();}}>Vidi sve pristigle zahteve</Button>
         <Button  style={{ color: 'white', backgroundColor: 'rgb(1 159 220)' }} onClick={()=>{prihvacene();setOpen(!open);handlep2();}}>Vidi sve prihvacene zahteve</Button>
       </div>  
       <div className={classes.miniPrikaz}>
         <div className={classes.divpristigli}>
         <Typography variant='h6' color='black' style={{textAlign:'center'}} hidden={!p1}>Ovde su vaši pristigli zahtevi:</Typography>
           <div className={classes.zahteviPristigli} hidden={!p1}>
         {data1.map((x,index) => {
              return (
                
                <CardPristigliZahtevi
                key={index}   
                  id={x.id}
                  ime={x.ucenik.ime}
                  prezime={x.ucenik.prezime}
                  korisnickoIme={x.ucenik.korisnickoIme}
                  brTelefona={x.ucenik.brTelefona}
                  email={x.ucenik.email}
                  grad={x.ucenik.grad}
                  adresa={x.ucenik.adresa}
                  napomena={x.napomena}
                  begin={x.pocetak}
                  end={x.kraj}
                 
                />
              );
           })}
        </div>
        </div>
        <div className={classes.divpristigli}>
        <Typography variant='h6' color='black' style={{textAlign:'center'}}hidden={!p2}>Ovde su zahtevi koji ste prihvatili:</Typography>
       <div className={classes.zahteviPrihvaceni} hidden={!p2}>
       {accept.map((p,index) => {
          return (
            <CardPrihvaceneUsluge 
            key={index}
            P2={p2}
              id={p.id}
              ime={p.ucenik.ime}
              prezime={p.ucenik.prezime}
              korisnickoIme={p.ucenik.korisnickoIme}
              brTelefona={p.ucenik.brTelefona}
              email={p.ucenik.email}
              grad={p.ucenik.grad}
              adresa={p.ucenik.adresa}
              napomena={p.napomena}
              idProfesora={pristigli.id}
              ucenikId={p.ucenikId}
              begin={p.pocetak}
              end={p.kraj}
            />
          );
        })}
        </div>
      </div>
      </div>
   </div> 
  )
}
export default PristigliZahtevi


    
    


    
    

