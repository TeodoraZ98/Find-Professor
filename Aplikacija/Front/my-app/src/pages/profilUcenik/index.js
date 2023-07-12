
import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NavBar from '../headerUcenik';
import CardSlika from './card';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import TextField from '../../components/TextField';
import { ButtonGroup } from '@mui/material';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';

const ProfilUcenik =(props)=>{

const {loged}=props;
// const [logovan,setLogovan]=useState('')
const[handle,setHandle1]=useState('')
// const[tokencic,setToken]=useState('false')

const token=localStorage.getItem('token')
    const[ch,setCh]=useState(true)
    const handleCh=()=>
    {
      const TOKEN=localStorage.getItem('token')
      if(token!==TOKEN || !TOKEN)
      {
        window.location.reload(false)
        return
      }
      setCh(!ch)
    }
      const classes = classStyles();
const [prihvaceni,setPrihvaceni]=useState([])
const [neprihvaceni,setNeprihvaceni]=useState([])
const [pending,setPending]=useState([])
const[gotovi,setGotovi]=useState([])

const [otvoriPrihvaceni,setP]=useState(false)
const [otvoriNeprihvaceni,setN]=useState(false)
const [otvoriPending,setOp]=useState(false)
const [otvoriGotovi,setG]=useState(false)


const handlePrihvaceni=()=>
{
     setP(!otvoriPrihvaceni)
}
const handleNeprihvaceni=()=>
{
   setN(!otvoriNeprihvaceni)
}
const handlePending=()=>
{
  setOp(!otvoriPending)
}
const handleGotovi=()=>
{
  setG(!otvoriGotovi)
}
const prihvaceni_zahtevi=async()=>
{
  const TOKEN=localStorage.getItem('token')
  if(token!==TOKEN || !TOKEN)
  {
    window.location.reload(false)
    return
  }
       await Axios.get('https://localhost:7138/Usluga/vratiUslugeUcenikuPoStatusu?idUcenika='  + loged.id + '&status=1',
        {
          headers:{ Authorization: `Bearer ${TOKEN}`}
        }).then(
          res=>

          {
              console.log(res)
          
              const provera= res.data + 'nista'
                if(provera==='nista')
            {
                  alert('Trenutno nema prihvacenih zahteva.Budite strpljivi!')
            }
                setPrihvaceni(res.data)
            }
        ).catch(err=>
          {
            if(err.response.status)
            {
              alert(err.response.data)
            }
            window.location.reload(false)
          }
          )
}
const odbijeni_zahtevi=async()=>
{
  const TOKEN=localStorage.getItem('token')
  if(token!==TOKEN || !TOKEN)
  {
    window.location.reload(false)
    return
  }
  await Axios.get('https://localhost:7138/Usluga/vratiUslugeUcenikuPoStatusu?idUcenika=' + loged.id + '&status=2',
  {
    headers:{ Authorization: `Bearer ${TOKEN}`}
  }).then(
            res=>
            {
              console.log(res)
           
              const provera= res.data + 'nista'
                if(provera==='nista')
            {
                  alert('Trenutno nema Vasih zahteva koje je profesor odbio.')
            }
                setNeprihvaceni(res.data)
            }
        ).catch(err=>
          {
            if(err.response.status)
            {
              alert(err.response.data)
            }
          }
          )
}

const date = new Date();
date.setHours(0)
// {console.log(
//   date.toLocaleDateString([], {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   }),
// );}

const pending_zahtevi=async()=>
{
  const TOKEN=localStorage.getItem('token')
  if(token!==TOKEN || !TOKEN)
  {
    window.location.reload(false)
    return
  }
  await Axios.get('https://localhost:7138/Usluga/vratiUslugeUcenikuPoStatusu?idUcenika=' + loged.id + '&status=0',
   { headers:{ Authorization: `Bearer ${TOKEN}`
  }}).then(
            res=>
            {
               console.log(res)
                
                const provera= res.data + 'nista'
                  if(provera==='nista')
              {
                    alert('Cas jos uvek nije odrzan.Mocice te da ocenite profesora kada zavrsite sa casom.')
              }
              setPending(res.data)
            }
        )
}

const gotovi_zahtevi=async()=>
{
  const TOKEN=localStorage.getItem('token')
  if(token!==TOKEN || !TOKEN)
  {
    window.location.reload(false)
    return
  }
 await Axios.get('https://localhost:7138/Usluga/vratiUslugeUcenikuPoStatusu?idUcenika=' + loged.id +'&status=3',
  {
  headers:{ Authorization: `Bearer ${TOKEN}`
}}).then(
            res=>
            { 
              console.log(res)
              const provera= res.data + 'nista'
                if(provera==='nista')
            {
                  alert('Cas jos uvek nije odrzan.Mocice te da ocenite profesora kada zavrsite sa casom.')
            }
                setGotovi(res.data)            
            }
        ).catch((error)=>
        {
          if(error.response.status)
          alert(error.response.data)
        })
}
const buttons = [
  <Button style={{borderTopLeftRadius:'20px',borderBottomLeftRadius:'20px'}}key="one" onClick={()=>{prihvaceni_zahtevi();handlePrihvaceni();}}>Prihvaceni</Button>,
  <Button key="two"onClick={()=>{odbijeni_zahtevi();handleNeprihvaceni();}}>Odbijeni</Button>,
  <Button key="three" onClick={()=>{pending_zahtevi();handlePending();}}>Na cekanju</Button>,
  <Button style={{borderTopRightRadius:'20px', borderBottomRightRadius:'20px'}}key="four"onClick={()=>{gotovi_zahtevi();handleGotovi();}}>Gotovi</Button>,
];

const [komentar,setKomentar]=useState('');
const [ocena,setOcena]=useState('');

const oceni =async(id,profesorId,komentar,ocena)=>
{ console.log(profesorId,komentar,ocena)
  const TOKEN=localStorage.getItem('token')
  if(token!=TOKEN || !TOKEN)
  {
    window.location.reload(false)
    return
  }
  if(komentar==='' || ocena <=0 || ocena >5 || ocena ==='' )
  {
    alert('Molimo Vas lepo popunite formu')
    return
  }
  let ucenikAJDI=loged.id
  await Axios.post('https://localhost:7138/Recenzija/dodajRecenzijuProfesoru',
  {
    ucenikAJDI: ucenikAJDI,
    profesorId,
     komentar,
     ocena
  },
  {
    headers:{Authorization:`Bearer ${TOKEN}`}
  }).then(res=>{
       console.log(res.data)
       console.log('Uspesno poslat komentar')
       alert('Uspesno ste podelili Vase misljenje o izvrsenoj usluzi i ocenili profesor-a!')
       brisi_uslugu(id)
       window.location.reload(false)
     }).catch((error)=>
     {
      if(error.response.status)
      {
        alert(error.response.data)
      }
      else
      {
        alert('Greska!')
      }
     })
}

const [profil,setProfil]=useState([])
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
   })
  const izmeni_ime=async()=>
   {
     const TOKEN=localStorage.getItem('token')
    if(token!==TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
    if(loged.id==='')
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
     await Axios.put('https://localhost:7138/Ucenik/azurirajUcenika',
      {
      id:loged.id,
      ime:profil.ime,
      prezime:profil.prezime,
      email:profil.email,
      korisnickoIme:profil.korisnickoIme,
      lozinka:profil.lozinka,
      brTelefona:profil.brTelefona,
      grad:profil.grad,
      adresa:profil.adresa,
      },
      {
        headers:{ Authorization: `Bearer ${TOKEN}`}
      }).then(res=>
        {
           console.log(res + 'zasto')
           setProfil(res.data)
           setData(res.data)
           window.location.reload(false)
          })
        }
        const izmeni_prezime=async()=>
        {
          const TOKEN=localStorage.getItem('token')
          if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
          if(loged.id==='')
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
          await Axios.put('https://localhost:7138/Ucenik/azurirajUcenika',
           {
            id:loged.id,
            ime:profil.ime,
            prezime:profil.prezime,
            email:profil.email,
            korisnickoIme:profil.korisnickoIme,
            lozinka:profil.lozinka,
            brTelefona:profil.brTelefona,
            grad:profil.grad,
            adresa:profil.adresa,
        
           },{
            headers:{ Authorization: `Bearer ${TOKEN}`}
          }).then(res=>
             {
                console.log(res + 'zasto')
                setProfil(res.data)
                setData(res.data)
                window.location.reload(false)
               })
             }
                  const izmeni_korisnicko_ime=async()=>
                  { const TOKEN=localStorage.getItem('token')
                  if(token!=TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
                    if(loged.id==='')
   {
      alert('Greska!!!')
   }
                    if(profil.korisnickoIme==='')
              { const TOKEN=localStorage.getItem('token')
                alert('Polje korisnicko ime ne sme biti prazno!!!')
                return
              }
                   await Axios.put('https://localhost:7138/Ucenik/azurirajUcenika',
                     {
                      id:loged.id,
                      ime:profil.ime,
                      prezime:profil.prezime,
                      email:profil.email,
                      korisnickoIme:profil.korisnickoIme,
                      lozinka:profil.lozinka,
                      brTelefona:profil.brTelefona,
                      grad:profil.grad,
                      adresa:profil.adresa,
                     },{
                      headers:{ Authorization: `Bearer ${TOKEN}`}
                    }).then(res=>
                       {
                          console.log(res + 'zasto')
                          setProfil(res.data)
                          setData(res.data)
                          window.location.reload(false)
                         }).catch((error)=>
                         {
                           if(error.response.status)
                           {
                             alert(error.response.data)
                           }
                         })
                       }
                       const [pwd, setPwd] = useState('');
                       const validatePwd = pass => {
                        return pass.match(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
                        );
                      };
                       const handleSifra=()=>
                       {
                        if (!validatePwd(pwd)) {
                          alert(
                            'Niste uneli validnu sifru. Lozinka mora da sadrzi: 1 malo slovo, 1 veliko slovo, 1 broj i mora da bude najmanje duzine 8'
                          );
                          return;
                        }
                       }
                       const izmeni_sifru=async()=>
                       {
                        const TOKEN=localStorage.getItem('token')
                        if(loged.id==='')
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
          
                          await Axios.put('https://localhost:7138/Ucenik/azurirajUcenika',
                          {
                            id:loged.id,
                            ime:profil.ime,
                            prezime:profil.prezime,
                            email:profil.email,
                            korisnickoIme:profil.korisnickoIme,
                            lozinka:profil.lozinka,
                            brTelefona:profil.brTelefona,
                            grad:profil.grad,
                            adresa:profil.adresa,                           
                       
                          }, { headers:{ Authorization: `Bearer ${TOKEN}`}
                        }).then(res=>
                            {
                               console.log(res + 'zasto')
                               setProfil(res.data)
                               setData(res.data)
                               alert('Uspesno ste izmenili sifru!')
                               window.location.reload(false)
                              })
                            }
                            const izmeni_broj_telefona=async()=>
                            { const TOKEN=localStorage.getItem('token')
                            if(token!==TOKEN || !TOKEN)
    {
      window.location.reload(false)
      return
    }
                              if(loged.id==='')
                              {
                               alert('Greska!!!')
                               }
                              if(profil.brTelefona==='')
              {
                alert('Polje broj telefona ne sme biti prazno!!!')
                return
              }           
                              await Axios.put('https://localhost:7138/Ucenik/azurirajUcenika',
                               {
                                id:loged.id,
                                ime:profil.ime,
                                prezime:profil.prezime,
                                email:profil.email,
                                korisnickoIme:profil.korisnickoIme,
                                lozinka:profil.lozinka,
                                brTelefona:profil.brTelefona,
                                grad:profil.grad,
                                adresa:profil.adresa,                                                          
                               },{
                                headers:{ Authorization: `Bearer ${TOKEN}`}
                              }).then(res=>
                                 {
                                    console.log(res + 'zasto')
                                    setProfil(res.data)
                                    setData(res.data)
                                    window.location.reload(false)
                                   })
                                 }
                                 const izmeni_grad=async()=>
                                 { 
                                  const TOKEN=localStorage.getItem('token')
                                  if(token!=TOKEN || !TOKEN)
                                  {
                                    window.location.reload(false)
                                    return
                                  }
                                  if(loged.id==='')
                                 {
                                  alert('Greska!!!')
                                   }
                                  if(profil.grad==='')
                                   {
                                       alert('Polje grad ne sme biti prazno!!!')
                                          return
                                            }
                                   await Axios.put('https://localhost:7138/Ucenik/azurirajUcenika',
                                    {
                                      id:loged.id,
      ime:profil.ime,
      prezime:profil.prezime,
      email:profil.email,
      korisnickoIme:profil.korisnickoIme,
      lozinka:profil.lozinka,
      brTelefona:profil.brTelefona,
      grad:profil.grad,
      adresa:profil.adresa,
                                    },{
                                      headers:{ Authorization: `Bearer ${TOKEN}`}
                                    }).then(res=>
                                      {
                                         console.log(res + 'zasto')
                                         setProfil(res.data)
                                         setData(res.data)
                                         window.location.reload(false)
                                        })
                                      }
                                      const izmeni_adresu=async()=>
                                      { const TOKEN=localStorage.getItem('token')
                                      if(token!=TOKEN || !TOKEN)
                                      {
                                        window.location.reload(false)
                                        return
                                      }
                                        if(loged.id==='')
                                        {
                                          alert('Greska!!!')
                                          }
                                        if(profil.adresa==='')
                                         {
                                             alert('Polje adresa ne sme biti prazno!!!')
                                            return
                                           }
                                         await Axios.put('https://localhost:7138/Ucenik/azurirajUcenika',
                                         {
                                          id:loged.id,
                                          ime:profil.ime,
                                          prezime:profil.prezime,
                                          email:profil.email,
                                          korisnickoIme:profil.korisnickoIme,
                                          lozinka:profil.lozinka,
                                          brTelefona:profil.brTelefona,
                                          grad:profil.grad,
                                          adresa:profil.adresa,                                 
                                         },{
                                          headers:{ Authorization: `Bearer ${TOKEN}`}
                                        }).then(res=>
                                           {
                                              console.log(res + 'zasto')
                                              setProfil(res.data)
                                              setData(res.data)
                                              window.location.reload(false)
                                             })
                                           }
                                     const[refresh,setRefresh]=useState(false)
useEffect(()=>
{
  async function fetch(){
  const TOKEN=localStorage.getItem('token')
  await Axios.get('https://localhost:7138/Ucenik/vratiUcenikaPoId?id=' + loged.id,
   {
 
      headers:{ Authorization: `Bearer ${TOKEN}`
}
   }).then(
      res=>
      {
         console.log(res)
         setProfil(res.data)
         setData(res.data)
       
      }
   )}
   fetch()
},[handle])
const[stanje,setStanje]=useState(-1)
const[skrij,setSkrij]=useState(false)
// const handleklik=()=>
// {
//   setSkrij(!skrij)
// }
const brisi_uslugu=async(props)=>
{ 
const TOKEN=localStorage.getItem('token')
if(token!==TOKEN || !TOKEN)
{
  window.location.reload(false)
  return
}
 await Axios.delete('https://localhost:7138/Usluga/obrisiUslugu?idUsluge=' + props,
  {
    headers:{ Authorization: `Bearer ${TOKEN}`}
  }).then(
    res=>
    { 
      console.log(res.data + 'AHAHHAAH BRISANO')
      window.location.reload(false)
    }
    )
}

const handleRefresh=()=>
{
  setRefresh(!refresh);
}
const [j,setJ]=useState(false)
const handlej=()=>
{
  setJ(!j)
}
const [x,setX]=useState(false)
const handlex=()=>
{
  setX(!x)
}
const [y,setY]=useState(false)
const handley=()=>
{
  setY(!y)
}
const [z,setZ]=useState(false)
const handlez=()=>
{
  setZ(!z)
}
let PocetakDatumPrihvaceni=null
let PocetakVremePrihvaceni=null
let PocetakDatumOdbijeni=null
let PocetakVremeOdbijeni=null
let PocetakDatumPending=null
let PocetakVremePending=null

      return(
           <div className='a' >
           <div className={classes.container}>
           <NavBar />
             <div className={classes.glavni}>  
             <CardSlika loged={loged}/>            
             <Card className={classes.paper} elevation={8}style={{display:'grid',backgroundColor:'#019fdc52',minWidth:'475px',marginBottom:'40px',marginTop:'40px',borderRadius:'0px'}}>
            <div className='jedan'>            
            <div className='dugmici'  style={{display:'grid',justifyContent:'center'}}>           
          </div>
          <div className='obavestenje'>
            <Typography variant='h6'style={{textAlign:'center'}}>Obavestenja o uslugama</Typography>
            <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >   
    <ButtonGroup size="medium" aria-label="large button group" >
        {buttons}
      </ButtonGroup>
    </Box>
  <div className='odgovor' style={{display:'grid'}}   >

{prihvaceni && prihvaceni.map((x,index5)=>

      (<div className='prihvaceni' hidden={otvoriPrihvaceni}style={{borderRadius:'10px',backgroundColor:'#a5e7f861',maxHeight:'200px'}}>
      <h6 hidden={true}>{PocetakDatumPrihvaceni= new Date(x.pocetak).toLocaleDateString()}</h6>
     <h6 hidden={true}>{ PocetakVremePrihvaceni= new Date(x.pocetak).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'})}</h6>
     
    
        <Typography>Profesor je prihvatio Vas zahtev za uslugu. 
         Imate cas {PocetakDatumPrihvaceni}  u  {PocetakVremePrihvaceni}. </Typography>               
             <Button onClick={()=>{brisi_uslugu(x.id);}}>Brisi</Button>
          </div>))}

{neprihvaceni && neprihvaceni.map((l,index1)=>
  (   <div className='neprihvaceni' hidden={otvoriNeprihvaceni}style={{borderRadius:'10px',backgroundColor:'#a5e7f861'}}>
      <h6 hidden={true}>{PocetakDatumOdbijeni= new Date(l.pocetak).toLocaleDateString()}</h6>
     <h6 hidden={true}>{ PocetakVremeOdbijeni= new Date(l.pocetak).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'})}</h6>
     <Typography>Profesor {l.profesor.ime} {l.profesor.prezime} je nazalost odbio uslugu 
datuma {PocetakDatumOdbijeni} u {PocetakVremeOdbijeni}.Molimo Vas ne dajte da Vas ovo obeshrabri, vec potrazite novog profesora!</Typography>
      <Button onClick={()=>{brisi_uslugu(l.id);}}>Brisi</Button>  
</div>
  ))

}
{pending && pending.map((k,index2)=>
(  <div className='pending' hidden={otvoriPending} style={{borderRadius:'10px',backgroundColor:'#a5e7f861',maxHeight:'100px'}}>
    <h6 hidden={true}>{PocetakDatumPending= new Date(k.pocetak).toLocaleDateString()}</h6>
     <h6 hidden={true}>{ PocetakVremePending= new Date(k.pocetak).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'})}</h6>
<Typography>Molimo Vas budite strpljivi profesor {k.profesor.ime} {k.profesor.prezime} jos uvek nije video Vasu uslugu 
 datuma {PocetakDatumPending} u {PocetakVremePending}. </Typography>
<Button onClick={()=>{brisi_uslugu(k.id);}}>Brisi</Button>
</div>
  ))}
  
{gotovi && gotovi.map((g,index)=>
(  <div key={g.id} className='gotovi' hidden={otvoriGotovi} style={{borderRadius:'10px',backgroundColor:'#a5e7f861',maxHeight:'500px'}}>
    <Typography>Vasa usluga je obavljena od strane profesora {g.profesor.ime} {g.profesor.prezime}  </Typography>
        <Typography style={{marginBottom:'20px',marginTop:'10px'}}>Molimo vas odvojite bar sekundi i ocenite profesora! </Typography>
     <div className='sakrij' hidden={skrij}>
      <TextField     
          required
          id="outlined-required"
          label="Komentari"
          multiline
          value={stanje===index ? komentar: ' '}
          defaultValue="Hello World"
          onClick={(e)=>{setKomentar('');setOcena(0);setStanje(index);}}
          onChange={ (e) => { setKomentar(e.target.value)}}  
        />
         <TextField   
          id="outlined-number"
          label="Ocena"
          type="number"
          value={stanje===index ? ocena: 0}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 1, max: 5} }}
          onClick={(e)=>{setOcena(0);setStanje(index);}}
          onChange={ (e) =>  { setOcena(e.target.value)}}                
        />
  <Button color='primary' onClick={()=>{oceni(g.id,g.profesorId,komentar,ocena);gotovi_zahtevi();}}>Posalji ocenu profesoru</Button>
  {console.log(g.id + 'mjauuu')}
  </div>
</div>
  ))}
</div>
</div>
 </div>
 </Card>
             <Card className={classes.paper} elevation={8} style={{backgroundColor:'#019fdc52',display:'grid',minWidth:'500px',marginBottom:'40px',marginTop:'40px',borderRadius:'0px'}}>
             <h3 style={{textAlign:'center',color:'black'}} className={classes.naslov2}>Opšti podaci</h3>
             <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4, md: 4 }} style={{display:'flex'}}>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                <label >Ime:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                <input type='text'  value={profil.ime} onChange={ (e) =>  setProfil((profil)=>({...profil,ime:e.target.value})) }disabled={ch}></input>
             </Grid>
              <Button style={{marginLeft:'120px'}}onClick={()=>{izmeni_ime();}}startIcon={<EditIcon/>}> Izmeni </Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label style={{}}>Prezime:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.prezime} onChange={ (e) =>  setProfil((profil)=>({...profil,prezime:e.target.value})) }  disabled={ch}></input>
             </Grid>         
              <Button style={{marginLeft:'120px'}}onClick={()=>{izmeni_prezime();}}startIcon={<EditIcon/>}> Izmeni</Button>
              <Grid item xs={6} sm={6} md={4} lg={3}>
                    <label style={{}}>Korisničko Ime:</label>
             </Grid> 
             <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis'  value={profil.korisnickoIme} onChange={ (e) =>  setProfil((profil)=>({...profil,korisnickoIme:e.target.value})) }disabled={ch}></input>
             </Grid>
              <Button style={{marginLeft:'120px'}}startIcon={<EditIcon/>}onClick={()=>{izmeni_korisnicko_ime();}}> Izmeni </Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label style={{}}>Lozinka:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='password' id='opis'   onChange={ (e) =>  setProfil((profil)=>({...profil,lozinka:e.target.value})) }disabled={ch}></input>
             </Grid>
              <Button style={{marginLeft:'120px'}}startIcon={<EditIcon/>}onClick={()=>{izmeni_sifru();}}> Izmeni</Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label style={{}}>Broj telefona:</label>
             </Grid>
             <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.brTelefona} onChange={ (e) =>  setProfil((profil)=>({...profil,brTelefona:e.target.value})) } disabled={ch}></input>
             </Grid> 
              <Button style={{marginLeft:'120px'}}startIcon={<EditIcon/>}onClick={()=>{izmeni_broj_telefona();}}> Izmeni </Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label style={{}}>Grad:</label>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.grad} onChange={ (e) =>  setProfil((profil)=>({...profil,grad:e.target.value})) } disabled={ch}></input>
             </Grid> 
              <Button style={{marginLeft:'120px'}}startIcon={<EditIcon/>}onClick={()=>{izmeni_grad();}}> Izmeni</Button>
             <Grid item xs={6} sm={6} md={4} lg={3}>
                   <label style={{}}>Adresa:</label>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={3}>
             <input type='text' id='opis' value={profil.adresa} onChange={ (e) =>  setProfil((profil)=>({...profil,adresa:e.target.value})) } disabled={ch}></input>
             </Grid>
              <Button style={{marginLeft:'120px'}}startIcon={<EditIcon/>}onClick={()=>{izmeni_adresu();}}> Izmeni</Button>
         </Grid> <div className='izmeniUcenika' style={{display:'flex',justifyContent:'center'}} >
             
       <Button variant="outlined" startIcon={<EditIcon />} onClick = {() =>{ handleCh() }} style={{backgroundColor:'rgb(1 159 220)',color:'black',borderRadius:'25px',marginTop:'20px'}}>
  Edituj podatke
 </Button>
  </div>
   </Card>
     </div>
    </div>
  <div className={classes.divButton}>
</div>
 </div>);}
  


export default ProfilUcenik