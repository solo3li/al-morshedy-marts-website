using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Data;

namespace BackendAPI.Services
{
    public class CloudinaryImageService : IImageService
    {
        private readonly IServiceProvider _serviceProvider;

        public CloudinaryImageService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task<string?> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return null;

            // Resolve context within scope to read dynamic settings
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var cloudName = await context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Cloudinary_CloudName");
            var apiKey = await context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Cloudinary_ApiKey");
            var apiSecret = await context.SystemSettings.FirstOrDefaultAsync(s => s.Key == "Cloudinary_ApiSecret");

            if (cloudName == null || apiKey == null || apiSecret == null || 
                string.IsNullOrEmpty(cloudName.Value) || 
                string.IsNullOrEmpty(apiKey.Value) || 
                string.IsNullOrEmpty(apiSecret.Value))
            {
                // Settings not configured
                throw new Exception("Cloudinary settings are not configured in the Admin Panel.");
            }

            Account account = new Account(cloudName.Value, apiKey.Value, apiSecret.Value);
            Cloudinary cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true;

            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "eshak_store",
                UseFilename = true,
                UniqueFilename = true,
                Overwrite = false
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return uploadResult.SecureUrl.ToString();
        }
    }
}
