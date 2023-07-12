using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.Models
{
    [Table("Recenzije")]
    public class Recenzija
    {
        [Key]
        public int Id { get; set; }

        public DateTime Vreme { get; set; }

        public string Komentar { get; set; }

        public double Ocena { get; set; }

        public int ProfesorId { get; set; }

        public int UcenikId { get; set; }

    }
}
