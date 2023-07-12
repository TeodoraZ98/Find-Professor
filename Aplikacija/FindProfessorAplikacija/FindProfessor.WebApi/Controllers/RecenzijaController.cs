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
    public class RecenzijaController : ControllerBase
    {
        private readonly RecenzijaService recenzijaService;

        public RecenzijaController(RecenzijaService recenzijaService)
        {
            this.recenzijaService = recenzijaService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("vratiSveRecenzije")]
        public IActionResult VratiSveRecenzije()
        {
            return new JsonResult(recenzijaService.VratiSveRecenzije());
        }

        [Authorize(Roles = "Admin,Ucenik,Profesor")]
        [HttpGet]
        [Route("vratiRecenzijuPoId")]
        public IActionResult VratiRecenzijuPoId(int id)
        {
            return new JsonResult(recenzijaService.VratiRecenzijuPoId(id));
        }

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpGet]
        [Route("vratiRecenzijeZaProfesora")]
        public IActionResult VratiRecenzijeZaProfesora(int id)
        {
            return new JsonResult(recenzijaService.VratiRecenzijeZaProfesora(id));
        }

 

        [Authorize(Roles = "Admin,Ucenik")]
        [HttpPost]
        [Route("dodajRecenzijuProfesoru")]
        public IActionResult DodajRecenzijuProfesoru([FromBody] Recenzija r)
        {
            Recenzija recenzija = recenzijaService.DodajRecenzijuProfesoru(r);
            

            return new JsonResult(recenzija);
        }


        [Authorize(Roles = "Admin,Ucenik,Profesor")]
        [HttpDelete]
        [Route("obrisiRecenziju")]
        public IActionResult ObrisiRecenziju(int idRecenzija)
        {
            Recenzija r = this.recenzijaService.ObrisiRecenziju(idRecenzija);
            return new JsonResult(r);
        }

        [Authorize(Roles = "Admin,Ucenik,Profesor")]
        [HttpPut]
        [Route("azurirajRecenziju")]
        public IActionResult AzurirajRecenziju(Recenzija r)
        {
            return new JsonResult(this.recenzijaService.AzurirajRecenziju(r));
        }

    }
}
