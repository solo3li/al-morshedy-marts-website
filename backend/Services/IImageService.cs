using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BackendAPI.Services
{
    public interface IImageService
    {
        Task<string?> UploadImageAsync(IFormFile file);
    }
}
