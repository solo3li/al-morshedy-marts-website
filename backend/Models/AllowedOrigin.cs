namespace BackendAPI.Models
{
    public class AllowedOrigin
    {
        public int Id { get; set; }
        public required string Url { get; set; }
    }
}
