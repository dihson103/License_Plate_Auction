using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AccountService.Entities
{
    public class UserAccount
    {
        [Key]
        public string Id { get; set; }
        public string FullName { get; set; } 
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
        public string Password { get; set; }
        public double Wallet { get; set; } = 0;
        public bool Status { get; set; }

    }
}
