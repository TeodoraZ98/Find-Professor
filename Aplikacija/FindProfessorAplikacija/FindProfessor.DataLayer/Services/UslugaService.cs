using FindProfessor.DataLayer.Services.Interfaces;
using FindProfessor.DataLayer.UnitOfWork;
using FindProfessor.Models;
using FindProfessor.DataLayer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services
{
    public class UslugaService : IUslugaService
    {
        private IUnitOfWork unitOfWork;

        public UslugaService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public List<Usluga> VratiSveUsluge()
        {
            
             return unitOfWork.UslugaRepository.All().ToList();
        }

        public List<Usluga> VratiUslugeUceniku(int idUcenika)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.UcenikId == idUcenika, k => k.Profesor).ToList();
        }

        public List<Usluga> VratiUslugeProfesoru(int idProfesor)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.ProfesorId == idProfesor && k.Status != StatusUsluge.Odbijena, k => k.Ucenik).ToList();
        }

       

        public List<Usluga> VratiUslugeUcenikuPoStatusu(int idUcenika, StatusUsluge status)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.UcenikId == idUcenika && k.Status == status, k => k.Profesor).ToList();
        }

        public List<Usluga> VratiUslugeProfesoruPoStatusu(int idProfesora, StatusUsluge status)
        {
            return unitOfWork.UslugaRepository.FindWithIncludes(k => k.ProfesorId == idProfesora && k.Status == status, k => k.Ucenik).ToList();
        }

        public Usluga DodajUslugu(Usluga u)
        {
            var provera = unitOfWork.UslugaRepository.Find(k => k.ProfesorId == u.ProfesorId &&
                                                                ((u.Pocetak >= k.Pocetak && u.Pocetak < k.Kraj) ||
                                                                (u.Kraj > k.Pocetak && u.Kraj <= k.Kraj)))
                                                                .FirstOrDefault();
            if (provera != null)
                return null;
            var usluga = unitOfWork.UslugaRepository.Add(u);
            unitOfWork.SaveChanges();
            return usluga;

        }


        public Usluga ObrisiUslugu(int id)
        {
            Usluga u = unitOfWork.UslugaRepository.Get(id);
            if (u != null)
            {
                unitOfWork.UslugaRepository.Delete(u);
                unitOfWork.SaveChanges();
                return u;
            }
            return null;
        }


        public Usluga AzurirajStatusUsluge(int idUsluge, StatusUsluge status)
        {
            Usluga u = unitOfWork.UslugaRepository.FindWithIncludes(k => k.Id == idUsluge, k => k.Profesor).FirstOrDefault();

            if (u == null)
                return null;

            u.Status = status;


            unitOfWork.UslugaRepository.Update(u);
            unitOfWork.SaveChanges();
            return u;
        }
    }
}
