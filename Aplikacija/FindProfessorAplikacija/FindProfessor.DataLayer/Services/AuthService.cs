using FindProfessor.DataLayer.Services.Interfaces;
using FindProfessor.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services
{
    public class AuthService : IAuthService
    {
        private UnitOfWork.UnitOfWork unitOfWork;

        public AuthService(fpDbContext context)
        {
            this.unitOfWork = new UnitOfWork.UnitOfWork(context);
        }

        public string GenerateJWT(IConfiguration config, Korisnik user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>();
            Claim c = new Claim(ClaimTypes.NameIdentifier, user.KorisnickoIme);
            claims.Add(c);
            c = new Claim(ClaimTypes.Email, user.Email);
            claims.Add(c);
         
            string role ="";
            switch(user.Tip)
            {
                case TipKorisnika.Ucenik:
                    role = "Ucenik";
                    break;
                case TipKorisnika.Profesor:
                    role = "Profesor";
                    break;
                case TipKorisnika.Admin:
                    role = "Admin";
                    break;
                default:
                    break;
            };
            c = new Claim(ClaimTypes.Role, role);
            claims.Add(c);


            var token = new JwtSecurityToken(config["Jwt:Issuer"],
              config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Korisnik AuthenticateUser(LogIn data)
        {

            Korisnik result = VratiKorisnikaPoEmailu(data.Email);
            bool isValidPass = false;
            var passwordHasher = new PasswordHasher<object>(); 
            var verificationResult = passwordHasher.VerifyHashedPassword(null, result.Lozinka, data.Password);
            isValidPass = verificationResult == PasswordVerificationResult.Success;

            if (result != null && isValidPass)
                return result;
            else return null;
        }
        //adminproba@gmail.com
        //sifra123


        public Korisnik VratiKorisnikaPoEmailu(string email)
        {

            Korisnik result = unitOfWork.AdminRepository.VratiAdminaPoEmailu(email);
            if (result == null)
                result = unitOfWork.ProfesorRepository.VratiProfesoraPoEmailu(email);
            if (result == null)
                result = unitOfWork.UcenikRepository.VratiUcenikaPoEmailu(email);

            if (result != null)
                return result;
            else return null;
        }


        public bool ProveriValidnostProfesora(int idProfesora)
        {
            Profesor p = unitOfWork.ProfesorRepository.Find(k => k.Id == idProfesora).FirstOrDefault();
            return p.Validan;

        }
    }
}
