namespace BackendAPI.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public required string UserId { get; set; }
        public ApplicationUser? User { get; set; }
        
        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
