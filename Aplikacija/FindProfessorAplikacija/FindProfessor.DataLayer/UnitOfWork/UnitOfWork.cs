using FindProfessor.DataLayer.Repository;
using FindProfessor.DataLayer.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private fpDbContext context;

        public UnitOfWork(fpDbContext context)
        {
            this.context = context;
        }

        private IAdminRepository adminRepository;
        public IAdminRepository AdminRepository
        {
            get
            {
                if (adminRepository == null)
                {
                    adminRepository = new AdminRepository(context);
                }
                return adminRepository;
            }
        }

        private IRecenzijaRepository recenzijaRepository;
        public IRecenzijaRepository RecenzijaRepository
        {
            get
            {
                if (recenzijaRepository == null)
                {
                    recenzijaRepository = new RecenzijaRepository(context);
                }
                return recenzijaRepository;
            }
        }

        private IProfesorRepository profesorRepository;
        public IProfesorRepository ProfesorRepository
        {
            get
            {
                if (profesorRepository == null)
                {
                    profesorRepository = new ProfesorRepository(context);
                }
                return profesorRepository;
            }
        }

        private IUslugaRepository uslugaRepository;
        public IUslugaRepository UslugaRepository
        {
            get
            {
                if (uslugaRepository == null)
                {
                    uslugaRepository = new UslugaRepository(context);
                }
                return uslugaRepository;
            }
        }

        private IUcenikRepository ucenikRepository;
        public IUcenikRepository UcenikRepository
        {
            get
            {
                if (ucenikRepository == null)
                {
                    ucenikRepository = new UcenikRepository(context);
                }
                return ucenikRepository;
            }
        }

        public void SaveChanges()
        {
            this.context.SaveChanges();
        }

        public void Rollback()
        {
            this.context.Dispose();
        }
    }
}
