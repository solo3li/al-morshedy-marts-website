using System.Text;
using System.Text.Json;
using BackendAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Services
{
    public class BrevoEmailService : IEmailService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly HttpClient _httpClient;

        public BrevoEmailService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.brevo.com/v3/");
        }

        public async Task<bool> SendEmailAsync(string toEmail, string toName, string subject, string htmlContent)
        {
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var apiKey = await context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Brevo_ApiKey");
            var senderEmail = await context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Brevo_SenderEmail");
            var senderName = await context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Brevo_SenderName");

            if (apiKey == null || string.IsNullOrEmpty(apiKey.Value) ||
                senderEmail == null || string.IsNullOrEmpty(senderEmail.Value))
            {
                // إعدادات الإيميل غير متوفرة، ربما يتم طباعة الخطأ في الكونسول أو تسجيله
                Console.WriteLine("Brevo settings are missing. Cannot send email.");
                return false;
            }

            var requestBody = new
            {
                sender = new { name = senderName?.Value ?? "Eshak Store", email = senderEmail.Value },
                to = new[] { new { email = toEmail, name = toName } },
                subject = subject,
                htmlContent = htmlContent
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("api-key", apiKey.Value);
            _httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            try
            {
                var response = await _httpClient.PostAsync("smtp/email", jsonContent);
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Error sending email via Brevo: " + error);
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception sending email via Brevo: " + ex.Message);
                return false;
            }
        }
    }
}
