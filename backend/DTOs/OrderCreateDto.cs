using System.ComponentModel.DataAnnotations;

namespace BackendAPI.DTOs
{
    public class OrderCreateDto
    {
        [Required]
        public string ShippingAddress { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Phone { get; set; }

        public string Notes { get; set; }
    }
}
