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
    public class UcenikService : IUcenikService
    {
        private IUnitOfWork unitOfWork;

        public UcenikService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<Ucenik> VratiSveUcenike()
        {
            var result = unitOfWork.UcenikRepository.All().ToList();
            return result;
        }
        public Ucenik VratiUcenikaPoId(int id)
        {
            return unitOfWork.UcenikRepository.Get(id);
        }

        public Ucenik DodajUcenika(Ucenik u, out StatusDodavanjaKorisnika status)
        {
            if (ValidacijaDodavanja(u, out status))
            {
                u.Tip = TipKorisnika.Ucenik;
                var passwordHasher = new PasswordHasher<Admin>();
                u.Lozinka = passwordHasher.HashPassword(null, u.Lozinka);
                u.Slika = "defaultKorisnik.jpg";
                var ucenik = unitOfWork.UcenikRepository.Add(u);
                unitOfWork.SaveChanges();
                return ucenik;
            }
            return null;

        }


        public Ucenik AzurirajUcenika(Ucenik u, out StatusDodavanjaKorisnika status)
        {
            status = StatusDodavanjaKorisnika.Uspesno;
            Ucenik ucenik = unitOfWork.UcenikRepository.Get(u.Id);
            if (ucenik != null)
            {
                ucenik.Ime = u.Ime ?? ucenik.Ime;
                ucenik.Prezime = u.Prezime ?? ucenik.Prezime;
                if (u.Email != null)
                {
                    if (ValidacijaDodavanja(u, out status))
                        ucenik.Email = u.Email;
                }
                if (u.KorisnickoIme != null)
                {
                    if (ValidacijaDodavanja(u, out status))
                        ucenik.KorisnickoIme = u.KorisnickoIme;
                }
                if (u.Lozinka != null)
                {
                    var passwordHasher = new PasswordHasher<Ucenik>();
                    u.Lozinka = passwordHasher.HashPassword(null, u.Lozinka);
                }
                ucenik.BrTelefona = u.BrTelefona ?? ucenik.BrTelefona;
                ucenik.Grad = u.Grad ?? ucenik.Grad;
                ucenik.Adresa = u.Adresa ?? ucenik.Adresa;

                unitOfWork.UcenikRepository.Update(ucenik);
                unitOfWork.SaveChanges();
                return ucenik;
            }
            return null;
        }

        public string VratiSlikuUcenika(int id)
        {
            Ucenik u = unitOfWork.UcenikRepository.Get(id);
            return u.Slika;
        }

        public void DodajSlikuUceniku(int idUcenik, string filename)
        {
            Ucenik u = unitOfWork.UcenikRepository.Get(idUcenik);
            u.Slika = filename;
            unitOfWork.UcenikRepository.Update(u);
            unitOfWork.SaveChanges();
        }

        public Ucenik ObrisiUcenika(int id)
        {
            Ucenik u = unitOfWork.UcenikRepository.Get(id);
            if (u != null)
            {
                unitOfWork.UcenikRepository.Delete(u);
                unitOfWork.SaveChanges();
                return u;
            }
            return null;
        }

        public bool ValidacijaDodavanja(Ucenik u, out StatusDodavanjaKorisnika status)
        {

            var postojiVecAdmin = unitOfWork.AdminRepository.Find(k => k.Email == u.Email).FirstOrDefault();
            if (postojiVecAdmin != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecAdmin = unitOfWork.AdminRepository.Find(k => k.KorisnickoIme == u.KorisnickoIme).FirstOrDefault();
            if (postojiVecAdmin != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            var postojiVecProfesor = unitOfWork.ProfesorRepository.Find(k => k.Email == u.Email).FirstOrDefault();
            if (postojiVecProfesor != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecProfesor = unitOfWork.ProfesorRepository.Find(k => k.KorisnickoIme == u.KorisnickoIme).FirstOrDefault();
            if (postojiVecProfesor != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            var postojiVecUcenik = unitOfWork.UcenikRepository.Find(k => k.Email == u.Email).FirstOrDefault();
            if (postojiVecUcenik != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecUcenik = unitOfWork.UcenikRepository.Find(k => k.KorisnickoIme == u.KorisnickoIme).FirstOrDefault();
            if (postojiVecUcenik != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            status = StatusDodavanjaKorisnika.Uspesno;
            return true;
        }

    }
}
