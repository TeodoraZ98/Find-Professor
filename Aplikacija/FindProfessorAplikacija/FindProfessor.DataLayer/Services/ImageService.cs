using FindProfessor.DataLayer.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services
{
    public class ImageService : IImageService
    {
        public ImageService()
        {
        }

        public async Task<String> SaveFile(IFormFile file, String user = "")
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles");
            string filename = "image_" + user + DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(file.FileName);
            using (var stream = new FileStream(Path.Combine(path, filename), FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return filename;
        }
    }
}
