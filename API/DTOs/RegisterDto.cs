using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage="Корисничкото име е задолжително.")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Лозинката е задолжително.")]
        public string Password { get; set; } 
    }
}
