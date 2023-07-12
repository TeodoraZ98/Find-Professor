const Usluge = () => {
  // const idUcenika=localStorage.getItem('idUcenika')
  return (
    <section id="services">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h3 className="section-title">Kako FindProfessor funkcionise</h3>
          <p className="section-description">
            Pronadjite najbolje profesore na nasem sajtu
          </p>
        </div>
        <div
          className="row"
          style={{ dispey: 'flex', justifyContent: 'center' }}
        >
       
          <div className="col-lg-4 col-md-6" data-aos="zoom-in">
            <div className="box">
              <div className="icon"  href='registerRoute'>
                <i class="fa-solid fas fa-chalkboard-teacher"></i>
              </div>
              <h4 className="title">Pronadji najbolje profesore</h4>
              <p className="description">
                Izaberite idealnog profesora za vas, mozete koristiti filtere kako bi pronasli upravo takvog!
              </p>
            </div>
          </div>


          <div className="col-lg-4 col-md-6" data-aos="zoom-in">
            <div className="box">
              <div className="icon">
              <i class="fa-solid fa-house"></i>
              </div>
              <h4 className="title">Mogucnost pronalaska profesora iz komfora vaseg doma</h4>
              <p className="description">
                Mozete iz komfora vaseg doma pronaci profesora koji ce vam pomoci da savladate gradivo koje vam i ne ide bas najbolje!
              </p>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{ dispey: 'flex', justifyContent: 'center' }}
        >
          <div className="col-lg-4 col-md-6" data-aos="zoom-in">
            <div className="box">
              <div className="icon">
              <i class="fa-solid fas fa-calendar"></i>
              </div>
              <h4 className="title">Izaberite termin koji odgovara vasem rasporedu</h4>
              <p className="description">
                Izaberite termin koji vam odgovara, a mozete izabrati termin u roku od par sekundi preko naseg sajta!
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6" data-aos="zoom-in">
            <div className="box">
              <div className="icon">
              <i class="fa-solid fa-money-bill"></i>
              </div>
              <h4 className="title">Pristupacne cene</h4>
              <p className="description">
                I pored svih ovih privilegija i dalje tezimo da usluge koje nudi nas sajt budu sto pristupacnije kako bi sto vise ljudi moglo da ima pristup edukaciji!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Usluge;
