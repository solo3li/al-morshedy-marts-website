namespace BackendAPI.Models
{
    public static class CorsConfig
    {
        public static HashSet<string> AllowedOrigins { get; set; } = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
    }
}
