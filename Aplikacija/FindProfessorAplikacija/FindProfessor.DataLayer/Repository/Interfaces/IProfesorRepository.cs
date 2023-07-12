using FindProfessor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Repository.Interfaces
{
    public interface IProfesorRepository : IRepository<Profesor>
    {
        public Profesor VratiProfesoraPoEmailu(string email);

    }
}
