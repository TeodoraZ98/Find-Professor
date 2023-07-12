using FindProfessor.DataLayer.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.UnitOfWork
{
    public interface IUnitOfWork
    {
        IAdminRepository AdminRepository { get; }

        IRecenzijaRepository RecenzijaRepository { get; }

        IProfesorRepository ProfesorRepository { get; }

        IUslugaRepository UslugaRepository { get; }

        IUcenikRepository UcenikRepository { get; }

        void SaveChanges();

        void Rollback();
    }
}
