const About = () => {
  return (
    <section id="about">
      <div className="container" data-aos="fade-up">
        <div className="row about-container">
          <div className="col-lg-6 content order-lg-1 order-2">
            <h2 className="title">O sajtu</h2>
            <p>
              Na ovom sajtu ćete naći strucne profesore koji pruzaju casove iz razlicitih oblasti.
            </p>
            <p>
              Cilj sajta findprofessor je da na lak i siguran način obezbedi kako ucenicima da pronadju profesora kako bi lakse savladali gradivo.{' '}
            </p>
            <p>
              Tako i profesorima da iskoriste svoje znanje kako bi zaradili dodatan prihod bez stalne obaveze
            </p>
            <p>
              Sajt pruža mogućnost komentarisanja i ocenjivanja profesora, kao pomoć pri odabiru profesora.
            </p>
          </div>

          <div
            className="col-lg-6 background order-lg-2 order-1"
            data-aos="fade-left"
            data-aos-delay="100"
          ></div>
        </div>
      </div>
    </section>
  );
};
export default About;
