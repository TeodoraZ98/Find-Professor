using FindProfessor.DataLayer.Services;
using FindProfessor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfesorController : ControllerBase
    {
        private readonly ProfesorService profesorService;
        private readonly ImageService imageService;

        public ProfesorController(ProfesorService profesorService, ImageService imageService)
        {
            this.profesorService = profesorService;
            this.imageService = imageService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiSveProfesore")]
        public IActionResult VratiSveProfesore()
        {
            return new JsonResult(profesorService.VratiSveProfesore());
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiNevalidneProfesore")]
        public IActionResult VratiNevalidneProfesore()
        {
            return new JsonResult(profesorService.VratiNevalidneProfesore());
        }

        [Authorize(Roles = "Profesor,Admin,Ucenik")]
        [HttpGet]
        [Route("vratiSveGradoveSvihProfesora")]
        public IActionResult VratiSveGradoveSvihProfesora()
        {
            return new JsonResult(profesorService.VratiSveGradoveSvihProfesora());
        }

        [Authorize(Roles = "Profesor,Admin,Ucenik")]
        [HttpGet]
        [Route("vratiSveOblastiSvihProfesora")]
        public IActionResult VratiSveOblastiSvihProfesora()
        {
            return new JsonResult(profesorService.VratiSveOblastiSvihProfesora());
        }

        [Authorize(Roles = "Admin,Profesor,Ucenik")]
        [HttpGet]
        [Route("vratiProfesoraPoId")]
        public IActionResult VratiProfesoraPoId(int id)
        {
            return new JsonResult(profesorService.VratiProfesoraPoId(id));
        }

        [Authorize(Roles = "Admin,Profesor")]
        [HttpGet]
        [Route("vratiSlikuProfesora")]
        public IActionResult VratiSlikuProfesora(int id)
        {
            try
            {
                String filename = this.profesorService.VratiSlikuProfesora(id);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpGet]
        [Route("filterProfesori")]
        public IActionResult VratiProfesoreFilter([FromQuery] string? ime, string? prezime, string? grad, double? minCena, double? maxCena, double? minOcena,string? oblast)
        {
            return new JsonResult(profesorService.FilterProfesori(ime, prezime,grad,minCena, maxCena, minOcena,oblast));
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("dodajProfesora")]
        public IActionResult DodajProfesora([FromBody] Profesor p)
        {
            StatusDodavanjaKorisnika status;
            var result = profesorService.DodajProfesora(p, out status);
            if (status == StatusDodavanjaKorisnika.PostojiEmail)
                return StatusCode(401, "U bazi vec postoji neko sa tim email-om!");
            if (status == StatusDodavanjaKorisnika.PostojiKorisnickoIme)
                return StatusCode(402, "U bazi vec postoji neko sa tim korisnickim imenom!");

            return new JsonResult(result);
        }

        [Authorize(Roles = "Admin,Profesor")]
        [HttpPost]
        [Route("dodajSlikuProfesoru")]
        public async Task<ActionResult> DodajSlikuProfesoru(int idProfesor, IFormFile file)
        {
            try
            {
                String username = this.profesorService.VratiProfesoraPoId(idProfesor).KorisnickoIme;
                String filename = await imageService.SaveFile(file, username);
                this.profesorService.DodajSlikuProfesoru(idProfesor, filename);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [Authorize(Roles = "Admin,Profesor")]
        [HttpDelete]
        [Route("obrisiProfesora")]
        public IActionResult ObrisiProfesora(int id)
        {
            Profesor p = this.profesorService.ObrisiProfesora(id);
            return new JsonResult(p);
        }

        [Authorize(Roles = "Admin,Profesor")]
        [HttpPut]
        [Route("azurirajProfesora")]
        public IActionResult AzurirajProfesora([FromBody] Profesor p)
        {
            StatusDodavanjaKorisnika status;
            Profesor profesor = this.profesorService.AzurirajProfesora(p, out status);
            return new JsonResult(profesor);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("prihvatiProfesora")]
        public IActionResult AzurirajProfesoraValidan(int idProfesor)
        {
            return new JsonResult(this.profesorService.AzurirajProfesoraValidan(idProfesor));
        }

        
    }
}
