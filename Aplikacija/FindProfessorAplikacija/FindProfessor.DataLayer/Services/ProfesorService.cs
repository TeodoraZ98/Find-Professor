using FindProfessor.DataLayer.Services.Interfaces;
using FindProfessor.DataLayer.UnitOfWork;
using FindProfessor.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services
{
    public class ProfesorService : IProfesorService
    {
        private IUnitOfWork unitOfWork;

        public ProfesorService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<Profesor> VratiSveProfesore()
        {
            var result = unitOfWork.ProfesorRepository.All().ToList();
            return result;
        }
        public List<Profesor> VratiNevalidneProfesore()
        {
            var result = unitOfWork.ProfesorRepository.All().Where(k => k.Validan == false).ToList();
            return result;
        }

        public Profesor VratiProfesoraPoId(int idProfesor)
        {
            return unitOfWork.ProfesorRepository.Get(idProfesor);
        }
      
        public List<String> VratiSveGradoveSvihProfesora()
        {
            return unitOfWork.ProfesorRepository.All().Select(k => k.Grad).Distinct().ToList();
        }


        public List<Profesor> FilterProfesori(string? ime, string? prezime, string? grad, double? minCena,double? maxCena, double? minOcena,string? oblast)
        {
            return unitOfWork.ProfesorRepository.Find/*WithIncludes*/(k=> k.Validan == true
                                                    && k.Ime.StartsWith(ime ?? k.Ime)
                                                    && k.Prezime.StartsWith(prezime ?? k.Prezime)
                                                    && k.Grad.StartsWith(grad ?? k.Grad)                      
                                                    && k.CenaPoSatu >= (minCena ?? k.CenaPoSatu)
                                                    && k.CenaPoSatu <= (maxCena ?? k.CenaPoSatu)
                                                    && k.ProsecnaOcena >= (minOcena ?? k.ProsecnaOcena)
                                                    && k.Oblast.StartsWith(oblast ?? k.Oblast)
                                                    //, k => k.Recenzije
                                                    ).ToList();
        }

        public string VratiSlikuProfesora(int id)
        {
            Profesor p = unitOfWork.ProfesorRepository.Get(id);
            return p.Slika;
        }

        public Profesor DodajProfesora(Profesor p, out StatusDodavanjaKorisnika status)
        {
            if(ValidacijaDodavanja(p, out status))
            {
                p.Tip = TipKorisnika.Profesor;
                var passwordHasher = new PasswordHasher<Profesor>();
                p.Lozinka = passwordHasher.HashPassword(null, p.Lozinka);
                p.Slika = "defaultKorisnik.jpg";
                var profesor = unitOfWork.ProfesorRepository.Add(p);
                unitOfWork.SaveChanges();
                return profesor;
            }
            return null;

        }
        public void DodajSlikuProfesoru(int idProfesor, string filename)
        {
            Profesor p = unitOfWork.ProfesorRepository.Get(idProfesor);
            p.Slika = filename;
            unitOfWork.ProfesorRepository.Update(p);
            unitOfWork.SaveChanges();
        }

        public Profesor ObrisiProfesora(int id)
        {
            Profesor p = unitOfWork.ProfesorRepository.Get(id);
            if (p != null)
            {
                unitOfWork.ProfesorRepository.Delete(p);
                unitOfWork.SaveChanges();
                return p;
            }
            return null;
        }


        public Profesor AzurirajProfesora(Profesor p, out StatusDodavanjaKorisnika status)
        {
            Profesor profesor = unitOfWork.ProfesorRepository.Get(p.Id);
            status = StatusDodavanjaKorisnika.Uspesno;
            if (profesor != null)
            {

                profesor.Ime = p.Ime ?? profesor.Ime;
                profesor.Prezime = p.Prezime ?? profesor.Prezime;
                if(p.Email != null)
                {
                    if (ValidacijaDodavanja(p, out status))
                        profesor.Email = p.Email;
                }
                if (p.KorisnickoIme != null)
                {
                    if (ValidacijaDodavanja(p, out status))
                        profesor.KorisnickoIme = p.KorisnickoIme;
                }
                if (p.Lozinka != null)
                {
                    var passwordHasher = new PasswordHasher<Profesor>();
                    p.Lozinka = passwordHasher.HashPassword(null, p.Lozinka);
                }
                  
                profesor.BrTelefona = p.BrTelefona ?? profesor.BrTelefona;
                profesor.Grad = p.Grad ?? profesor.Grad;
                profesor.Adresa = p.Adresa ?? profesor.Adresa;


                profesor.Opis = p.Opis ?? profesor.Opis;
                profesor.Slika = p.Slika ?? profesor.Slika;
                if (p.CenaPoSatu != 0)
                    profesor.CenaPoSatu = p.CenaPoSatu;

                profesor.Oblast = p.Oblast ?? profesor.Oblast;

                unitOfWork.ProfesorRepository.Update(profesor);
                unitOfWork.SaveChanges();
                return profesor;
            }
            return null;
        }

        public Profesor AzurirajProfesoraValidan(int idProfesor)
        {
            Profesor p = VratiProfesoraPoId(idProfesor);

            if (p == null)
                return null;

            if (p.Validan == false)
                p.Validan = true;
            else
                p.Validan = false;

            unitOfWork.ProfesorRepository.Update(p);
            unitOfWork.SaveChanges();
            return p;
        }

     

        public bool ValidacijaDodavanja(Profesor p, out StatusDodavanjaKorisnika status)
        {
            
            var postojiVecAdmin = unitOfWork.AdminRepository.Find(k => k.Email == p.Email).FirstOrDefault();
            if (postojiVecAdmin != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecAdmin = unitOfWork.AdminRepository.Find(k => k.KorisnickoIme == p.KorisnickoIme).FirstOrDefault();
            if (postojiVecAdmin != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            var postojiVecProfesor = unitOfWork.ProfesorRepository.Find(k => k.Email == p.Email).FirstOrDefault();
            if (postojiVecProfesor != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecProfesor = unitOfWork.ProfesorRepository.Find(k => k.KorisnickoIme == p.KorisnickoIme).FirstOrDefault();
            if (postojiVecProfesor != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            var postojiVecUcenik = unitOfWork.UcenikRepository.Find(k => k.Email == p.Email).FirstOrDefault();
            if (postojiVecUcenik != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecUcenik = unitOfWork.UcenikRepository.Find(k => k.KorisnickoIme == p.KorisnickoIme).FirstOrDefault();
            if (postojiVecUcenik != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            status = StatusDodavanjaKorisnika.Uspesno;
            return true;
        }

        public List<String> VratiSveOblastiSvihProfesora()
        {
            return unitOfWork.ProfesorRepository.All().Select(k => k.Oblast).Distinct().ToList();
        }
    }
}
