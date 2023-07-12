using FindProfessor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services.Interfaces
{
    public interface IProfesorService
    {
        public List<Profesor> VratiSveProfesore();
        public List<Profesor> FilterProfesori(string? ime, string? prezime, string? grad, double? minCena, double? maxCena, double? minOcena,string? oblast);
        public Profesor DodajProfesora(Profesor p, out StatusDodavanjaKorisnika status);
        public Profesor ObrisiProfesora(int id);
        public Profesor AzurirajProfesoraValidan(int idProfesor);
        public bool ValidacijaDodavanja(Profesor p, out StatusDodavanjaKorisnika status);
        public Profesor AzurirajProfesora(Profesor p, out StatusDodavanjaKorisnika status);
    }
}
