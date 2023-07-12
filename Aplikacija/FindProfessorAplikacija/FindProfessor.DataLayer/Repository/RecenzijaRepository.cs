using FindProfessor.DataLayer.Repository;
using FindProfessor.DataLayer.Repository.Interfaces;
using FindProfessor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Repository
{
    public class RecenzijaRepository : Repository<Recenzija>, IRecenzijaRepository
    {
        public RecenzijaRepository(fpDbContext context) : base(context)
        {

        }
    }
}
