using FindProfessor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services.Interfaces
{
    public interface IUcenikService
    {
        public Ucenik DodajUcenika(Ucenik u, out StatusDodavanjaKorisnika status);
        public Ucenik ObrisiUcenika(int id);
        public bool ValidacijaDodavanja(Ucenik u, out StatusDodavanjaKorisnika status);
        public Ucenik AzurirajUcenika(Ucenik u, out StatusDodavanjaKorisnika status);
    }
}
