using FindProfessor.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services.Interfaces
{
    public interface IAuthService
    {
        public string GenerateJWT(IConfiguration config, Korisnik user);
        public Korisnik AuthenticateUser(LogIn data);
        public Korisnik VratiKorisnikaPoEmailu(string email);
        public bool ProveriValidnostProfesora(int idSitera);
    }
}
