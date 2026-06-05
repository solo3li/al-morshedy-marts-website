namespace BackendAPI.Services
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(string toEmail, string toName, string subject, string htmlContent);
    }
}
