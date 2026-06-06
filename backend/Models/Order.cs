using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Required]
        public string Status { get; set; } = "قيد المراجعة"; // قيد المراجعة, قيد التجهيز, تم الشحن, مكتمل, ملغي

        [Required]
        public string ShippingAddress { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Phone { get; set; }

        public string Notes { get; set; }

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
