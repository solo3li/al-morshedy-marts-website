namespace BackendAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Brand { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public int? Discount { get; set; }
        public required string Image { get; set; }
        public double Rating { get; set; }
        public int Reviews { get; set; }
        public string? Badge { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
