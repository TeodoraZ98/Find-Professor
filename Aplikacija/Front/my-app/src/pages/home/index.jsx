import {useState } from 'react';
import About from '../komponente/about';
import Recenzije from '../komponente/recenzije';
import Usluge from '../komponente/usluge';
import NadjiProfesora from '../komponente/nadjiprofesora';
import PostaniProfesor from '../komponente/postaniprofesor';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeaderAdmin from '../../components/HeaderAdmin';
import NavbarUcenik from '../headerUcenik';
import NavBarProfesor from '../headerProfesor';
import { useNavigate } from 'react-router-dom';

export const Home = (props) => {
  // const[refresh,setRefresh]=useState('')
  const {kuca}=props
  const navigate=useNavigate();
  // const [logovan,setLogovan]=useState('')

  return (
<div className='wrapper'>
{ kuca.tip===0 ? <NavbarUcenik/>: (kuca.tip===1 ?  <NavBarProfesor/> :(kuca.tip===2 ? <HeaderAdmin/> : <Header/>))} 
  <section id="hero">
    <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
      <h1>Dobro došli na portal findprofessor</h1>
      <h2>Mesto gde mozete pronaci najstrucnije profesore</h2>
      {kuca.tip===1?  <a href="#about"  hidden={true} className="btn-get-started">Zapocnite findprofessor avanturu!</a> :
       (kuca.tip===0 ?  <a href="#about" hidden={true} className="btn-get-started">Zapocnite findprofessor avanturu!</a>  :
       (kuca.tip===2?  <a href="#about" hidden={true} className="btn-get-started">Zapocnite findprofessor avanturu!</a> : 
       <a hidden={false} className="btn-get-started" onClick={()=>{navigate('/registerRoute')}}>
        Zapocnite findprofessor avanturu!
        </a> ))} 
    </div>
  </section>
  <main id="main">
<About/>
<NadjiProfesora/>
<PostaniProfesor/>
<Recenzije/>
<Usluge/>
    <section id="contact"  xs={12} md={6}>
      <div className="container" xs={12} md={6}>
        <div className="section-header">
          <h3 className="section-title">Kontakt</h3>
        </div>
      </div>
     
     <div className='mapa' style={{display:'flex'}} >
      <iframe src="https://www.google.com/maps/d/embed?mid=1p95vLLSFycE7WfhdUqjusOMVy9lyWyU&ehbc=2E312F" width="1520" height="480" style={{display:'flex'}}></iframe>
      </div>
      <div className="container mt-5" >
        <div className="row justify-content-center" >
          <div className="col-lg-3 col-md-4">
            <div className="info" style={{display:'contents'}} >
              <div>
                <i className="bi bi-geo-alt"></i>
                <p>Gavrila Principa 18, Beograd</p>
              </div>

              <div>
                <i className="bi bi-envelope"></i>
                <p>findprofessor@gmail.com</p>
              </div>

              <div>
                <i className="bi bi-phone" ></i>
                <p >+381 060 987 4567</p>
              </div>
            </div>
        </div>
      </div>
      </div>
    </section>

  </main>
<Footer />
</div> 
)

}

export default Home;