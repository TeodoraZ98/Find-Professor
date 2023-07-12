using FindProfessor.DataLayer.Repository;
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
    public class AdminRepository : Repository<Admin>, IAdminRepository
    {
        public AdminRepository(fpDbContext context) : base(context)
        {
        }

        public Admin VratiAdminaPoEmailu(string email)
        {
            return Find(k => k.Email == email).AsNoTracking().FirstOrDefault();
        }
    }
}
