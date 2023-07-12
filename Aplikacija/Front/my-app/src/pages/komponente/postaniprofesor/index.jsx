
import classStyles from './styles';
import { useNavigate } from "react-router-dom";
import { registerRoute } from "../../../router/routes";
import { CardContent } from "@mui/material";
const PostaniProfesor=()=>
{
  const navigate=useNavigate();
  const classes = classStyles();
  return (
 <section id="about">
 <div className="container" data-aos="fade-up">
   <div className="row about-container">

     <div style={{marginTop:'50px'}}className="col-lg-6 content order-lg-1 order-2">
       <h2 className="title">Želiš da postaneš profesor?</h2>
       <h4>
      Ukoliko smatras da si dovoljno strucan u odredjenoj oblasti i zelis da svoje znanje podelis sa drugima a da pritom zaradis dodatan novac na pravom si mestu!
       </h4>
       
      
       <button
       className={classes.dugme}
       onClick={() => {navigate(registerRoute)}}
       >
        Postani profesor
      </button>
       
     </div>
     <div className="class=col-xl-5 col-lg-6 d-flex justify-content-center video-box align-items-stretch position-relative">
     <CardContent>
     <div className="col-lg-6  order-1"  data-aos-delay="100" style={{display:'flex'}}>
     <img className={classes.slika} 
      style={{height: '400px',width: null,flex: 1 }}
      src="https://images.ctfassets.net/pdf29us7flmy/35XD3JZO2sBeTtisb5cF7r/7ed42006c51e3fb8552f2c1ac24601f9/-IND-001-038-_How_To_Become_a_Teacher_Final.jpg?w=720&q=100&fm=jpg" class="glightbox play-btn mb-4"/>
     </div>
     </CardContent>
 </div>
</div>
 </div>
</section>
    )
}
export default PostaniProfesor
