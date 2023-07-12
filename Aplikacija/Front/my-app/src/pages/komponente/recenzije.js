const Recenzije=()=>
{
    return(
      <section id="team">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h3 className="section-title">Pogodnosti za sve</h3>
          <p className="section-description">
            Uverite se i sami!
          </p> 
        </div>
        <div className="row">
          


          <div className="col-lg-6 col-md-6">
            <div className="member" data-aos="fade-up" data-aos-delay="300">
              <div className="pic"><img  src="https://img.freepik.com/premium-photo/group-happy-young-students-university_85574-4531.jpg" alt=""/></div>
              <h4>Pogodnost za ucenike</h4>
              <span>Ucenici ce moci da na lak nacin pronadju profesora i lakse savladaju gradivo.</span>
              
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="member" data-aos="fade-up" data-aos-delay="400">
              <div className="pic"><img src="https://marvel-b1-cdn.bc0a.com/f00000000026007/resilienteducator.com/wp-content/uploads/2014/11/math-teacher.jpg" alt=""/></div>
              <h4>Pogodnost za profesore</h4>
              <span>Profesori sticu iskustvo i finansijski prihoduju od drzanja svakog casa.</span>
            
            </div>
          </div>
        </div>

      </div>
    </section>
    )
}
export default Recenzije;