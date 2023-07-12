using FindProfessor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services.Interfaces
{
    public interface IUslugaService
    {
        public Usluga AzurirajStatusUsluge(int idUsluge, StatusUsluge status);
        public Usluga DodajUslugu(Usluga u);
        public Usluga ObrisiUslugu(int id);
        public List<Usluga> VratiSveUsluge();
        public List<Usluga> VratiUslugeProfesoru(int idProfesora);
        public List<Usluga> VratiUslugeProfesoruPoStatusu(int idProfesora, StatusUsluge status);
        public List<Usluga> VratiUslugeUceniku(int idUcenika);
        public List<Usluga> VratiUslugeUcenikuPoStatusu(int idUcenika, StatusUsluge status);
    }
}
