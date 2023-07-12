using FindProfessor.DataLayer.Services.Interfaces;
using FindProfessor.DataLayer.UnitOfWork;
using FindProfessor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services
{
    public class RecenzijaService : IRecenzijaService
    {
        private IUnitOfWork unitOfWork;

        public RecenzijaService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public List<Recenzija> VratiSveRecenzije()
        {
            return unitOfWork.RecenzijaRepository.All().ToList();
        }
        public Recenzija VratiRecenzijuPoId(int id)
        {
            return unitOfWork.RecenzijaRepository.Get(id);
        }
    
        public List<Recenzija> VratiRecenzijeZaProfesora(int id)
        {
            Profesor profesor = unitOfWork.ProfesorRepository.FindWithIncludes(k => k.Id == id, k => k.Recenzije).FirstOrDefault();

            if (profesor == null)
            {
                return new List<Recenzija>();
            }

            return profesor.Recenzije.ToList();
        }


        public Recenzija DodajRecenzijuProfesoru(Recenzija r)
        {
            var profesor = unitOfWork.ProfesorRepository.FindWithIncludes(k => k.Id == r.ProfesorId, k => k.Recenzije).FirstOrDefault();

            r.Vreme = DateTime.Now;
            profesor.Recenzije.Add(r);

            double suma = 0;
            profesor.Recenzije.ForEach(k => suma += k.Ocena);
            profesor.ProsecnaOcena = suma / profesor.Recenzije.Count;

            unitOfWork.ProfesorRepository.Update(profesor);
            unitOfWork.SaveChanges();
            return r;
        }

        public Recenzija ObrisiRecenziju(int idRecenzija)
        {
            Recenzija r = unitOfWork.RecenzijaRepository.Get(idRecenzija);
            if (r != null)
            {
                    Profesor profesor = unitOfWork.ProfesorRepository.FindWithIncludes(k => k.Id == r.ProfesorId, k => k.Recenzije).FirstOrDefault();
                    if (profesor.Recenzije.Count != 1)
                    {
                        double suma = 0;
                        profesor.Recenzije.ForEach(k => suma += k.Ocena);
                        suma -= r.Ocena;
                        profesor.ProsecnaOcena = suma / (profesor.Recenzije.Count - 1);
                    }
                    else
                    {
                        profesor.ProsecnaOcena = 0;
                    }

                    unitOfWork.ProfesorRepository.Update(profesor);
                    unitOfWork.SaveChanges();
                    unitOfWork.RecenzijaRepository.Delete(r);
                    unitOfWork.SaveChanges();
                    return r;
            }
               
            return null;
        }

        public Recenzija AzurirajRecenziju(Recenzija r)
        {
            Recenzija recenzija = unitOfWork.RecenzijaRepository.Get(r.Id);
            if (recenzija != null)
            {
                recenzija.Komentar = r.Komentar ?? recenzija.Komentar;
                recenzija.Ocena = r.Ocena;
                Profesor profesor = unitOfWork.ProfesorRepository.FindWithIncludes(k => k.Id == recenzija.ProfesorId, k => k.Recenzije).FirstOrDefault();
                      
                double suma = 0;
                profesor.Recenzije.ForEach(k => suma += k.Ocena);
                profesor.ProsecnaOcena = suma / profesor.Recenzije.Count;

                unitOfWork.ProfesorRepository.Update(profesor);
                unitOfWork.SaveChanges();

                recenzija.Vreme = DateTime.Now;

                unitOfWork.RecenzijaRepository.Update(recenzija);
                unitOfWork.SaveChanges();
                return recenzija;
            }
            return null;
        }

    }
}
