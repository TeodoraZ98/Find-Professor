using FindProfessor.DataLayer.Services;
using FindProfessor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UcenikController : ControllerBase
    {
        private readonly UcenikService ucenikService;
        private readonly ImageService imageService;

        public UcenikController(UcenikService ucenikService, ImageService imageService)
        {
            this.ucenikService = ucenikService;
            this.imageService = imageService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiSveUcenike")]
        public IActionResult VratiSveUcenike()
        {
            return new JsonResult(ucenikService.VratiSveUcenike());
        }

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpGet]
        [Route("vratiUcenikaPoId")]
        public IActionResult VratiUcenikaPoId(int id)
        {
            return new JsonResult(ucenikService.VratiUcenikaPoId(id));
        }

        [Authorize(Roles = "Admin,Ucenik,Profesor")]
        [HttpGet]
        [Route("vratiSlikuUcenika")]
        public IActionResult VratiSlikuUcenika(int id)
        {
            try
            {
                String filename = this.ucenikService.VratiSlikuUcenika(id);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpPost]
        [Route("dodajSlikuUceniku")]
        public async Task<ActionResult> DodajSlikuUceniku(int idUcenik, IFormFile file)
        {
            try
            {
                String username = this.ucenikService.VratiUcenikaPoId(idUcenik).KorisnickoIme;
                String filename = await imageService.SaveFile(file, username);
                this.ucenikService.DodajSlikuUceniku(idUcenik, filename);
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles", filename));
                return File(image, "image/jpeg");
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("dodajUcenika")]
        public IActionResult DodajUcenika([FromBody] Ucenik u)
        {
            StatusDodavanjaKorisnika status;
            var result = ucenikService.DodajUcenika(u, out status);
            if (status == StatusDodavanjaKorisnika.PostojiEmail)
                return StatusCode(501, "U bazi vec postoji neko sa tim email-om!");
            if (status == StatusDodavanjaKorisnika.PostojiKorisnickoIme)
                return StatusCode(502, "U bazi vec postoji neko sa tim korisnickim imenom!");

            return new JsonResult(result);
        }

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpDelete]
        [Route("obrisiUcenika")]
        public IActionResult ObrisiUcenika(int id)
        {
            Ucenik u = this.ucenikService.ObrisiUcenika(id);
            return new JsonResult(u);
        }

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpPut]
        [Route("azurirajUcenika")]
        public IActionResult AzurirajUcenika([FromBody] Ucenik u)
        {
            StatusDodavanjaKorisnika status;
            Ucenik ucenik = this.ucenikService.AzurirajUcenika(u, out status);
            return new JsonResult(ucenik);
        }

    }
}
