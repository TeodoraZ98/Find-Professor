import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Axios from 'axios';
const UcenikZahtevi =()=>
{
const idUcenika=localStorage.getItem('idUcenika')
const [prihvaceni,setPrihvaceni]=useState([])
const prihvaceni_zahtevi=()=>
{
    const TOKEN=localStorage.getItem('token')
        Axios.get('https://localhost:7138/Usluga/vratiUslugeUcenikuPoStatusu?idUcenika=' + idUcenika + '&status=1',
        {
            headers:{ Authorization: `Bearer ${TOKEN}`}
          }).then(
            res=>

            {
                console.log(res)
                setPrihvaceni(res.data)
            }
        )
}

return(
    <div className='prihvaceni_zahtevi'>

<Button color='success' onClick={prihvaceni_zahtevi}>Klikni da vidis sve prihvacene zahteve</Button>
{prihvaceni && prihvaceni.map(x=>
    (   <div>
        <h3 >Profesor:{x.profesor.ime} {x.profesor.prezime} je prihvatio vas zahtev</h3>
</div>
    ))}

</div>
)
}
export default UcenikZahtevi