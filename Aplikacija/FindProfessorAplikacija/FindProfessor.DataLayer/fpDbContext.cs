using Microsoft.EntityFrameworkCore;
using FindProfessor.Models;

namespace FindProfessor.DataLayer
{
    public class fpDbContext:DbContext
    {
        public fpDbContext(DbContextOptions<fpDbContext> options)
            :base(options) 
        {

        }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Profesor> Profesori { get; set; }
        public DbSet<Recenzija> Recenzije { get; set; }
        public DbSet<Ucenik> Ucenici { get; set; }
        public DbSet<Admin> Admini { get; set; }
        public DbSet<Usluga> Usluge { get; set; }
        public DbSet<LogIn> LogIn { get; set; }


    }
}
