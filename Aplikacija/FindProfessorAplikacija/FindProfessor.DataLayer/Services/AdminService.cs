using FindProfessor.DataLayer.Services.Interfaces;
using FindProfessor.DataLayer.UnitOfWork;
using FindProfessor.Models;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Crypto.Generators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services
{
    public class AdminService : IAdminService
    {
        private IUnitOfWork unitOfWork;

        public AdminService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<Admin> VratiSveAdmine()
        {
            var result = unitOfWork.AdminRepository.All().ToList();
            return result;
        }

        public Admin DodajAdmina(Admin a, out StatusDodavanjaKorisnika status)
        {
            if (ValidacijaDodavanja(a, out status))
            {
                a.Tip = TipKorisnika.Admin;
                var passwordHasher = new PasswordHasher<Admin>(); 
                a.Lozinka = passwordHasher.HashPassword(null, a.Lozinka);
                var admin = unitOfWork.AdminRepository.Add(a);
                unitOfWork.SaveChanges();
                return admin;
            }
            return null;

        }

        public Admin ObrisiAdmina(int id)
        {
            Admin a = unitOfWork.AdminRepository.Get(id);
            if (a != null)
            {
                unitOfWork.AdminRepository.Delete(a);
                unitOfWork.SaveChanges();
                return a;
            }
            return null;
        }

        public Admin AzurirajAdmina(Admin a)
        {
            Admin admin = unitOfWork.AdminRepository.Get(a.Id);
            if (admin != null)
            {
                admin.Ime = a.Ime ?? admin.Ime;
                admin.Prezime = a.Prezime ?? admin.Prezime;
                admin.KorisnickoIme = a.KorisnickoIme ?? admin.KorisnickoIme;
                admin.Email = a.Email ?? admin.Email;
                if (a.Lozinka != null)
                {
                    var passwordHasher = new PasswordHasher<Admin>(); 
                    a.Lozinka = passwordHasher.HashPassword(null, a.Lozinka);
                }
                admin.BrTelefona = a.BrTelefona ?? admin.BrTelefona;
                admin.Grad = a.Grad ?? admin.Grad;
                admin.Adresa = a.Adresa ?? admin.Adresa;

                unitOfWork.AdminRepository.Update(admin);
                unitOfWork.SaveChanges();
                return admin;
            }
            return null;
        }

        public bool ValidacijaDodavanja(Admin v, out StatusDodavanjaKorisnika status)
        {

            var postojiVecAdmin = unitOfWork.AdminRepository.Find(k => k.Email == v.Email).FirstOrDefault();
            if (postojiVecAdmin != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecAdmin = unitOfWork.AdminRepository.Find(k => k.KorisnickoIme == v.KorisnickoIme).FirstOrDefault();
            if (postojiVecAdmin != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            var postojiVecProfesor = unitOfWork.ProfesorRepository.Find(k => k.Email == v.Email).FirstOrDefault();
            if (postojiVecProfesor != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecProfesor = unitOfWork.ProfesorRepository.Find(k => k.KorisnickoIme == v.KorisnickoIme).FirstOrDefault();
            if (postojiVecProfesor != null)
            {
                status = StatusDodavanjaKorisnika.PostojiKorisnickoIme;
                return false;
            }

            var postojiVecUcenik = unitOfWork.UcenikRepository.Find(k => k.Email == v.Email).FirstOrDefault();
            if (postojiVecUcenik != null)
            {
                status = StatusDodavanjaKorisnika.PostojiEmail;
                return false;
            }
            postojiVecUcenik = unitOfWork.UcenikRepository.Find(k => k.KorisnickoIme == v.KorisnickoIme).FirstOrDefault();
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
