using FindProfessor.DataLayer.Repository.Interfaces;
using FindProfessor.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Repository
{
    public class UcenikRepository : Repository<Ucenik>, IUcenikRepository
    {
        public UcenikRepository(fpDbContext context) : base(context)
        {
        }

        public Ucenik VratiUcenikaPoEmailu(string email)
        {
            return Find(k => k.Email == email).AsNoTracking().FirstOrDefault();
        }

    }
}
