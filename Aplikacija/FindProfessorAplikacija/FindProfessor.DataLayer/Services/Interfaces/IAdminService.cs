using FindProfessor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services.Interfaces
{
    public interface IAdminService
    {
        public List<Admin> VratiSveAdmine();
        public Admin DodajAdmina(Admin a, out StatusDodavanjaKorisnika status);
        public Admin ObrisiAdmina(int id);
        public Admin AzurirajAdmina(Admin a);
        public bool ValidacijaDodavanja(Admin v, out StatusDodavanjaKorisnika status);
    }
}
