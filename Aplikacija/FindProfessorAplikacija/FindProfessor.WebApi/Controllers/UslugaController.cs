using FindProfessor.DataLayer.Services;
using FindProfessor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UslugaController : ControllerBase
    {
        private readonly UslugaService uslugaService;

        public UslugaController(UslugaService uslugaService)
        {
            this.uslugaService = uslugaService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiSveUsluge")]
        public IActionResult VratiSveUsluge()
        {
            return new JsonResult(uslugaService.VratiSveUsluge());
        }

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpGet]
        [Route("vratiUslugeUceniku")]
        public IActionResult VratiUslugeUceniku(int idUcenika)
        {
            return new JsonResult(uslugaService.VratiUslugeUceniku(idUcenika));
        }

        [Authorize(Roles = "Admin,Profesor")]
        [HttpGet]
        [Route("vratiUslugeProfesoru")]
        public IActionResult VratiUslugeProfesoru(int idProfesora)
        {
            return new JsonResult(uslugaService.VratiUslugeProfesoru(idProfesora));
        }


        [Authorize(Roles = "Admin,Ucenik")]
        [HttpGet]
        [Route("vratiUslugeUcenikuPoStatusu")]
        public IActionResult VratiUslugeUcenikuPoStatusu(int idUcenika, StatusUsluge status)
        {
            return new JsonResult(uslugaService.VratiUslugeUcenikuPoStatusu(idUcenika, status));
        }



        [Authorize(Roles = "Admin,Profesor")]
        [HttpGet]
        [Route("vratiUslugeProfesoruPoStatusu")]
        public IActionResult VratiZahteveProfesoruPoStatusu(int idProfesora, StatusUsluge status)
        {
            return new JsonResult(uslugaService.VratiUslugeProfesoruPoStatusu(idProfesora, status));
        }

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpPost]
        [Route("dodajUslugu")]
        public IActionResult DodajUslugu([FromBody] Usluga u)
        {
            Usluga usluga = uslugaService.DodajUslugu(u);
            if (usluga == null)
                return BadRequest("Ucenik je tada zauzet!");

            return new JsonResult(usluga);
        }

        [Authorize(Roles = "Admin,Ucenik,Profesor")]
        [HttpDelete]
        [Route("obrisiUslugu")]
        public IActionResult ObrisiUslugu(int idUsluge)
        {
            Usluga u = this.uslugaService.ObrisiUslugu(idUsluge);
            return new JsonResult(u);
        }

        [Authorize(Roles = "Admin,Profesor")]
        [HttpPut]     
        [Route("azurirajStatusUsluge")]
        public IActionResult AzurirajStatusUsluge(int idUsluge, StatusUsluge status)
        {
            return new JsonResult(this.uslugaService.AzurirajStatusUsluge(idUsluge, status));
        }
    }
}
