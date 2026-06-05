namespace BackendAPI.DTOs
{
    public class AuthResponseDto
    {
        public required string Token { get; set; }
        public required string Email { get; set; }
        public string? FullName { get; set; }
    }
}
