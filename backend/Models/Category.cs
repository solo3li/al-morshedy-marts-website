namespace BackendAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Icon { get; set; }
        public required string Image { get; set; }

        public List<Product> Products { get; set; } = new();
    }
}
