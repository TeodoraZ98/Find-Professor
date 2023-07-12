import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import classStyles from './styles';
import Opis from './components/opis';
import { useNavigate } from 'react-router-dom';
import { slikeUrl } from '../../../backendAddress';
import BookIcon from '@mui/icons-material/Book';
import { Button } from '@mui/material';

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = classStyles();
  const navigate = useNavigate();
  const {
    ime,
    opis,
    prezime,
    lozinka,
    email,
    oblast,
    slika,
    brTelefona,
    grad,
    adresa,
    cenaPoSatu,
    korisnickoIme,
    prosecnaOcena,
    id,
  } = props;

  console.log(prezime);
  return (
    <div className="kartica">
      <Card sx={{ width: 200, maxHeigh: 10 }} className={classes.kartica}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {ime[0]}
            </Avatar>
          }
          action={<BookIcon style={{ color: '#055e81' }} />}
          title={ime}
        />
        <CardMedia
          component="img"
          height="130"
          // image={slika2}                           //OVA DVA NACINA SU ISTA
          // src={require('../../../slike/s1.jpg')}   //OVA DVA NACINA SU ISTA
          src={slikeUrl + slika}
          alt="Paella dish"
        />
        <CardContent>
          <Opis
            opis={opis}
            oblast={oblast}
            brTelefona={brTelefona}
            grad={grad}
            adresa={adresa}
            cenaPoSatu={cenaPoSatu}
            prosecnaOcena={prosecnaOcena}
            id={id}
            prezime={prezime}
            lozinka={lozinka}
            email={email}
            korisnickoIme={ korisnickoIme}
          />
          <div>
            <Button
              style={{
                color: 'white',
                backgroundColor: 'rgb(1 159 220)',
                // height: '32px',
                // width:153
              }}
              value={id}
              onChange={e => e.target.value}
              onClick={() => {
                console.log(props);
                navigate('/ucenikRoute',{state:id}); 
              }}
            >
              Odaberi profesora
            </Button>
          </div>
          Prosecna ocena : {prosecnaOcena}
          <br />
          Cena : {cenaPoSatu}
          <br />
          Grad: {grad}
          <br/>
          Oblast: {oblast}
        </CardContent>
      </Card>
    </div>
  );
}
