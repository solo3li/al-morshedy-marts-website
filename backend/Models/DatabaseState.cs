namespace BackendAPI.Models
{
    public class DatabaseState
    {
        public bool IsPostgres { get; set; }
        public bool ConnectionFailed { get; set; }
    }
}
