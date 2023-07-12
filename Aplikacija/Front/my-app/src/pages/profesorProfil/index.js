import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardSlika from './card';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import NavBarProfesor from '../headerProfesor';
import Card from '@mui/material/Card';
const ProfesorProfil =(props)=>
{

const[profil,setProfil]=useState([])
const {user}=props;
const token=localStorage.getItem('token')
// let niz=[]
useEffect(()=>
{async function vrati(){
   const TOKEN=localStorage.getItem('token')
   await Axios.get('https://localhost:7138/Profesor/vratiProfesoraPoId?id=' + user.id,
   {
    headers:{ Authorization: `Bearer ${TOKEN}`
}}).then(
       res=>
       {
           console.log(res)
          setProfil(res.data)
          setData(res.data)
          
       }
    )}
    vrati();
},[])

const [data,setData]=useState(
   {
      id:0,
      ime:'',
      prezime:'',
      email:'',
      korisnickoIme:'',
      lozinka:'',
      brTelefona:'',
      grad:'',
      adresa:'',
      cenaPoSatu:'',
      opis:'',
      oblast:''
      
   })
//   const cancel =()=>
//   {
//      const newData={...data}
//      setData(newData)
//   }
// const azuriraj=async()=>
// {  {console.log('2')}
//    {console.log(profil)}
//    const TOKEN=localStorage.getItem('token')
//    await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
// {
//    id:profil.id,
//    ime:profil.ime,
//    prezime:profil.prezime,
//    korisnickoIme:profil.korisnickoIme,
//    lozinka:profil.lozinka,
//    brTelefona:profil.brTelefona,
//    grad:profil.grad,
//    adresa:profil.adresa,
//    cenaPoSatu:profil.cenaPoSatu,
//    opis:profil.opis,
//    oblast:profil.oblast
// },{
//     headers:{ Authorization: `Bearer ${TOKEN}`
// }}
//    ).then(
//       res=>
//       {
//          console.log(res)
//          setProfil(res.data)
//          setData(res.data)
//          window.location.reload(false)
//       }
//       )
//    }
   const izmeniime=async()=>{
if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.ime==='')
   {
     alert('Polje ime ne sme biti prazno!')
     return
   }
   if(profil.ime.length>20)
   {
      alert('Duzina imena ne sme biti duze od 20 karaktera!')
      return
   }
   const TOKEN=localStorage.getItem('token')
   await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   lozinka:profil.lozinka,
   brTelefona:profil.brTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   opis:profil.opis,
   oblast:profil.oblast,
   email:profil.email
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
const izmeniprezime=async()=>{
const TOKEN=localStorage.getItem('token')
if(user.id==='')
   {
      alert('Greska!!!')
   }
if(profil.prezime==='')
          {
            alert('Polje prezime ne sme biti prazno!')
            return
          }
          if(profil.prezime.length>30)
          {
             alert('Duzina prezimena ne sme biti duze od 30 karaktera!')
             return
          }
   await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:user.id,
   prezime:profil.prezime,
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
         
      }
      )
   }
   const izmenikorisnickoime=async()=>
{  
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.korisnickoIme==='')
   {
     alert('Polje korisnicko ime ne sme biti prazno!!!')
     return
   }
   await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   lozinka:profil.lozinka,
   brTelefona:profil.brTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   opis:profil.opis,
   oblast:profil.oblast,
   email:profil.email
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`
}}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
         
      }
      ).catch((error)=>
      {
         if(error.response.status)
         {
            alert(error.response.data)
         }
      })
   }

   const izmenisifru=async()=>
{ 
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.lozinka==='')
   {
     alert('Polje lozinka ne sme biti prazno!!!')
     return
   }
   if(profil.lozinka.length>=20)
   {
     alert('Polje lozinka ne sme imati vise od 20 karaktera!!!')
     return
   }
  await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   lozinka:profil.lozinka,
   brTelefona:profil.brTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   opis:profil.opis,
   oblast:profil.oblast,
   email:profil.email
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
   const izmenibrojtelefona=async()=>
   {  
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.brTelefona==='')
   {
     alert('Polje broj telefona ne sme biti prazno!!!')
     return
   }
  await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   lozinka:profil.lozinka,
   brTelefona:profil.brTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   opis:profil.opis,
   oblast:profil.oblast,
   email:profil.email
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
   const izmenigrad=async()=>
{ 
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.grad==='')
   {
     alert('Polje grad ne sme biti prazno!!!')
     return
   }
  await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   lozinka:profil.lozinka,
   brTelefona:profil.brTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   opis:profil.opis,
   oblast:profil.oblast,
   email:profil.email
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
   const izmeniadresu=async()=>
{  
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
   }
   if(profil.adresa==='')
   {
     alert('Polje adresa ne sme biti prazno!!!')
     return
   }
  await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   lozinka:profil.lozinka,
   brTelefona:profil.brTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   opis:profil.opis,
   oblast:profil.oblast,
   email:profil.email
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
         
      }
      )
   }
   const izmenicenuposatu=async()=>{
const TOKEN=localStorage.getItem('token')
if(user.id==='')
   {
      alert('Greska!!!')
      return
   }
if(profil.cenaPoSatu<=0)
{
   alert('Molimo Vas unesite validan broj veci od nule!!!')
   return
}
if(profil.cenaPoSatu==='')
{
   alert('Polje cena po satu ne sme biti prazno!!!')
   return
}
   await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   lozinka:profil.lozinka,
   brTelefona:profil.brTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   opis:profil.opis,
   oblast:profil.oblast,
   email:profil.email
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
   const izmenibio=async()=>
   { 
   const TOKEN=localStorage.getItem('token')
   if(user.id==='')
   {
      alert('Greska!!!')
      return
   }
   if(profil.opis==='')
   {
      alert('Polje biografija ne sme biti prazno!!!')
      return
   }
   await Axios.put('https://localhost:7138/Profesor/azurirajProfesora',
{
   id:profil.id,
   ime:profil.ime,
   prezime:profil.prezime,
   korisnickoIme:profil.korisnickoIme,
   lozinka:profil.lozinka,
   brTelefona:profil.brTelefona,
   grad:profil.grad,
   adresa:profil.adresa,
   cenaPoSatu:profil.cenaPoSatu,
   opis:profil.opis,
   oblast:profil.oblast,
   email:profil.email
},
{
    headers:{ Authorization: `Bearer ${TOKEN}`}
}
   ).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
         window.location.reload(false)
      }
      )
   }
    const[ch,setCh]=useState(true)
  const HandleCh=()=>
   {
      const TOKEN=localStorage.getItem('token')
      if(token!=TOKEN || !TOKEN)
      {
         window.location.reload(false)

         return
      }
      setCh(!ch)

   }
      const classes = classStyles();
          return(
           <>
           <div className={classes.container}>
           <NavBarProfesor />
             <div className={classes.glavni}>
             <CardSlika korisnik={user}/>
             <Card className={classes.paper} elevation={8} style={{display:'grid',backgroundColor:'#019fdc52',minWidth:'50px',marginBottom:'40px',marginTop:'40px',borderRadius:'0px'}}>
            <div className='prvomajski'style={{textAlign:'center'}}>
             <h1 className={classes.naslov2}>Opšti podaci</h1>
             </div>
             <div>
             <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4, md: 4 }}>
               
              <Grid item xs={6} sm={6} md={4} lg={3}>
                <label>Ime:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                <input type='text' id='opis' value={profil.ime} onChange={ (e) =>  setProfil((profil)=>({...profil,ime:e.target.value})) }  disabled={ch}></input>
            
             </Grid>
                <Button style={{marginLeft:'110px'}}onClick={()=>{izmeniime();}}startIcon={<EditIcon/>}> Izmeni </Button>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label>Prezime:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.prezime} onChange={ (e) =>  setProfil((profil)=>({...profil,prezime:e.target.value})) }  disabled={ch}></input>
           
             </Grid>
             <Button style={{marginLeft:'110px'}}onClick={()=>{izmeniprezime();}}startIcon={<EditIcon/>}> Izmeni </Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label>Korisničko Ime:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.korisnickoIme} onChange={ (e) =>  setProfil((profil)=>({...profil,korisnickoIme:e.target.value})) }  disabled={ch}></input>
            
             </Grid>
             <Button style={{marginLeft:'110px'}}onClick={()=>{izmenikorisnickoime();}}startIcon={<EditIcon/>}> Izmeni </Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label>Lozinka:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='password' id='opis'  onChange={ (e) => setProfil((profil)=>({...profil,lozinka:e.target.value}))}  disabled={ch}></input>
            
             </Grid>
             <Button style={{marginLeft:'110px'}}onClick={()=>{izmenisifru();}}startIcon={<EditIcon/>}> Izmeni </Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label>Broj telefona:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.brTelefona} onChange={ (e) =>  setProfil((profil)=>({...profil,brTelefona:e.target.value})) }  disabled={ch}></input>
            
             </Grid> 
             <Button style={{marginLeft:'110px'}}onClick={()=>{izmenibrojtelefona();}}startIcon={<EditIcon/>}> Izmeni </Button>
             
             
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label>Grad:</label>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.grad} onChange={ (e) =>  setProfil((profil)=>({...profil,grad:e.target.value}))}  disabled={ch}></input>
           
             </Grid> 
             <Button style={{marginLeft:'110px'}}onClick={()=>{izmenigrad();}}startIcon={<EditIcon/>}> Izmeni </Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label>Adresa:</label>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.adresa} onChange={ (e) =>  setProfil((profil)=>({...profil,adresa:e.target.value}))}   disabled={ch}></input>
             
             </Grid>
             <Button style={{marginLeft:'110px'}}onClick={()=>{izmeniadresu();}}startIcon={<EditIcon/>}> Izmeni </Button>
      
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label>Cena po satu:</label>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='number' id='opis'  value={profil.cenaPoSatu} onChange={ (e) =>  setProfil((profil)=>({...profil,cenaPoSatu:e.target.value}))}  disabled={ch}></input>
           
             </Grid>
             <Button style={{marginLeft:'110px'}}onClick={()=>{izmenicenuposatu();}}startIcon={<EditIcon/>}> Izmeni </Button>
             </Grid>
             <TextField 
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={profil.opis}
          style={{display:'flex',marginTop:'20px'}}
          onChange={ (e) =>  setProfil((profil)=>({...profil,opis:e.target.value})) }
        />
             </div>
              <Button style={{textAlign:'center'}}onClick={()=>{izmenibio();}}startIcon={<EditIcon/>}> Izmeni </Button>
             <div className='izmeniUcenika' style={{display:'flex',marginTop:'20px',justifyContent:'center'}}>
      <Button variant="outlined" startIcon={<EditIcon />} onClick = {() => { HandleCh(); }} style={{backgroundColor:'rgb(1 159 220)',color:'black',borderRadius:'25px',margin:'10px'}}>
  Edituj podatke
    </Button>
  </div>
</Card>
 </div>
  </div>
 <div className={classes.divButton}>
</div>
       </>
          );
    }
  

export default  ProfesorProfil