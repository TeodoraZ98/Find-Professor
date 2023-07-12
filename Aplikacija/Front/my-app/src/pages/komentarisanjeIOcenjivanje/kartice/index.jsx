import React, { useEffect, useState } from 'react';
import classStyles from './styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Ocene from '../ocene/index.jsx';

export default function BasicCard(props) {
  const { vreme, komentar, ocena, ucenikId,comment } = props;
const timeDate=new Date(vreme).toLocaleDateString()
const timeTime=new Date(vreme).toLocaleTimeString(['hr-HR'],{hour:'2-digit',minute:'2-digit'});
  const [ucenik, setUcenici] = useState([]);
  useEffect(() => {
    const TOKEN=localStorage.getItem('token')
    fetch(
      'https://localhost:7138/Ucenik/vratiUcenikaPoId?id=' + comment.id,
      {
    headers:{ Authorization: `Bearer ${TOKEN}`}
      }
    ).then(async res => {
      const rez = await res.json();
      setUcenici(rez);
    });
  }, []);

  const classes = classStyles();
  return (
    <div className={classes.divKartica}>
      <Card style={{ border: '1px solid black', flex: 1 }}>
        <Ocene style={{}} ocena={ocena} />
        <Typography variant="h5" component="div" style={{ marginLeft: '15px' }}>
          {ucenik.ime} {ucenik.prezime}
        </Typography>

        <CardContent>
          <Typography
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          ></Typography>

          <Typography variant="body1">{komentar}</Typography>
          <div className={classes.divVreme}>{'Dana: ' + timeDate + ' u ' + timeTime}</div>
        </CardContent>
      </Card>
    </div>
  );
}
