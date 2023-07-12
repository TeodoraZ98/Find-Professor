using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.Models
{
    [Table("LogIn")]
    public class LogIn
    {
        [Key]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
