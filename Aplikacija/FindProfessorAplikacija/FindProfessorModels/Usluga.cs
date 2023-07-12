using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.Models
{
    public enum StatusUsluge
    {
        Zahtev,
        Prihvacena,
        Odbijena,
        Obavljena
    };

    [Table("Usluge")]
    public class Usluga
    {
        [Key]
        public int Id { get; set; }

        public Ucenik? Ucenik { get; set; }

        public int UcenikId { get; set; }

        public Profesor? Profesor { get; set; }

        public int ProfesorId { get; set; }

        public DateTime Pocetak { get; set; }

        public DateTime Kraj { get; set; }

        public string Napomena { get; set; }

        public StatusUsluge Status { get; set; }

    }
}
