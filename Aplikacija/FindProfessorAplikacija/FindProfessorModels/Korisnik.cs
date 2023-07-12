using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace FindProfessor.Models
{
    public enum StatusDodavanjaKorisnika
    {
        Uspesno,
        PostojiEmail,
        PostojiKorisnickoIme
    };

    public enum TipKorisnika
    {
        Ucenik,
        Profesor,
        Admin
    };

    [Table("Korisnici")]
    public class Korisnik
    {
       // [Required(ErrorMessage = "ID je neophodan")]
        [Key]
        public int Id { get; set; }
        public TipKorisnika Tip { get; set; }

      //  [Required(ErrorMessage = "Prezime je neophodno")]
        public string Prezime { get; set; }
       // [Required(ErrorMessage = "Ime je neophodno")]
        public string Ime { get; set; }

       // [Required(ErrorMessage = "Br telefona je neophodan")]
        public string BrTelefona { get; set; }

      //  [Required(ErrorMessage = "Email je neophodan")]
        public string Email { get; set; }

       // [Required(ErrorMessage = "Lozinka je neophodna")]
        public string Lozinka { get; set; }

       // [Required(ErrorMessage = "KorisnickoIme je neophodno")]
        public string KorisnickoIme { get; set; }

       // [Required(ErrorMessage = "Grad je neophodan")]
        public string Grad { get; set; }

      //  [Required(ErrorMessage = "Adresa je neophodna")]
        public string Adresa { get; set; }

       
    }
}
