import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom'

const NotFound = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            align="center"
            variant="h4"
            fontWeight='bold'
            
          >
            404: Stranica koju trazite se ne nalazi ovde
          </Typography>
          <Typography
            align="center"
            color=" orange"
            variant="title"
            style={{marginBottom:'20px'}}
          >
            Molimo Vas koristite navigaciju
            {/* You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation */}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="https://miro.medium.com/v2/resize:fit:800/1*hFwwQAW45673VGKrMPE2qQ.png"
              style={{
                marginTop: 0,
                display: 'inline-block',
                maxWidth: '100%'
              }}
              // https://media.istockphoto.com/vectors/error-page-or-file-not-found-icon-vector-id924949200?k=20&m=924949200&s=612x612&w=0&h=n3NzIx5MWfdouq0iyYiegzPrOfR6J4B-luYlIsAM-2E=
            />
          </Box>
          <Link
            to='/'                                                                                                                                              
          >
            <Button
            style={{backgroundColor:'orange',color:'white',marginTop:'20px'}}
              component="a"
              startIcon={(<ArrowBackIcon fontSize="small" />)}
              
              variant="contained"
              
            >
              Vrati se na pocetnu
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;