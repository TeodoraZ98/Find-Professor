using FindProfessor.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.DataLayer.Services.Interfaces
{
    public interface IImageService
    {
        public Task<String> SaveFile(IFormFile file, String user = "");
    }
}