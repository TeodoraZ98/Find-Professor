
import classStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { registerRoute } from '../../../router/routes';
import { CardContent } from '@mui/material';

const NadjiProfesora = () => {
const navigate = useNavigate();
const classes = classStyles();
  return (
    <section id="about">
      <div className="container">
        <div className="row about-container">
       
          <div className="class=col-xl-5 col-lg-6 d-flex justify-content-center video-box align-items-stretch position-relative">
            <CardContent>
            <img
              style={{height:'400px',
                width: '500px',
                flex: 1 }}
              className={classes.slika}
              src="https://world.edu/wp-content/uploads/2018/11/tired_student_at_books.png"
              class="glightbox play-btn mb-4"
            />
          </CardContent>
          </div>
          <div
            style={{ marginTop: '50px' }}
            className="col-lg-6 content order-lg-1 order-2"
          >
            <h2 className="title">Potreban Vam je profesor?</h2>
            <h4>
              Pronadjite profesora koji odgovara bas Vama i uz njegovu pomoc savladajte tesko gradivo!
            </h4>
            <button
              className={classes.dugme}
              onClick={() => navigate(registerRoute)}
              >
              Nadji profesora
            </button>
             
          </div>
        </div>
        </div>
      {/* </div> */}
    </section>
  );
};
export default NadjiProfesora;