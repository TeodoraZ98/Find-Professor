using FindProfessor.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindProfessor.Models
{
    [Table("Profesor")]
    public class Profesor : Korisnik
    {
        public Profesor()
        {
            Recenzije = new List<Recenzija>();
        }
        // public int ProfesorID { get; set; }
        public bool Validan { get; set; } 

       // [Required(ErrorMessage = "ProsecnaOcena je neophodna")]
        public double ProsecnaOcena { get; set; } = 0.0;
       // [Required(ErrorMessage = "Opis je neophodan")]
        public string Opis { get; set; }
        //[Required(ErrorMessage = "ID je neophodan")]

      //  [Required(ErrorMessage = "CenaPoSatu je neophodna")]
        public double CenaPoSatu { get; set; }

        //   [Required(ErrorMessage = "Slika je neophodna")]
        public string? Slika { get; set; } 

        public string Oblast { get; set; }

        public List<Recenzija> Recenzije { get; set; }
    }
}
