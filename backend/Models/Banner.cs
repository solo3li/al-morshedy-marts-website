namespace BackendAPI.Models
{
    public class Banner
    {
        public int Id { get; set; }
        public required string Image { get; set; }
        public required string Title { get; set; }
        public required string Subtitle { get; set; }
    }
}
