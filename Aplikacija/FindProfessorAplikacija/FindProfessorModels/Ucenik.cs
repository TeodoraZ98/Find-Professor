using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FindProfessor.Models
{
    [Table("Ucenik")]

    public class Ucenik : Korisnik
    {
       public int? Razred { get; set; }

       // [Required(ErrorMessage = "Slika je neophodna")]
        public string? Slika { get; set; }
    }
}
