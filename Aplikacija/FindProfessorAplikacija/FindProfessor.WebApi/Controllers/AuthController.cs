using FindProfessor.DataLayer.Services;
using FindProfessor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FindProfessor.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private IConfiguration config;
        private readonly AuthService authService;

        public AuthController(IConfiguration config, AuthService authService)
        {
            this.config = config;
            this.authService = authService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LogIn data)
        {
            IActionResult response = Unauthorized();
            var user = this.authService.AuthenticateUser(data);
            if (user != null)
            {
                if(user.GetType().Name == "Profesor" && this.authService.ProveriValidnostProfesora(user.Id) == false)
                {
                    return StatusCode(501, "Ovaj profesor nije prihvacen od strane admina!");
                }
                var tokenString = this.authService.GenerateJWT(config, user);
                response = Ok(new { token = tokenString, korisnik = user });
            }
            return response;
        }


        [Authorize]
        [HttpGet]
        [Route("vratiKorisnikaPoTokenu")]
        public IActionResult VratiKorisnikaPoTokenu(string token)
        {
            IActionResult response = Unauthorized();

            var handler = new JwtSecurityTokenHandler();
            var rToken = handler.ReadJwtToken(token);
            string email = rToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            if (string.IsNullOrEmpty(email))
                return StatusCode(405, "Pogresan token");

            var user = this.authService.VratiKorisnikaPoEmailu(email);

            if (user != null)
            {
                if (user.GetType().Name == "Profesor" && this.authService.ProveriValidnostProfesora(user.Id) == false)
                {
                    return StatusCode(406, "Ovaj profesor nije prihvacen od strane admina!");
                }

                response = Ok(user);
            }
            return response;
        }

        [Authorize]
        [HttpGet]
        [Route("vratiTrenutnogKorisnika")]
        public IActionResult VratiTrenutnogKorisnika()
        {
            IActionResult response = Unauthorized();
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if(identity != null)
            {
                var userClaims = identity.Claims;

                string email = userClaims.FirstOrDefault(k => k.Type == ClaimTypes.Email)?.Value;
                var user = authService.VratiKorisnikaPoEmailu(email);

                if (user != null)
                    response = Ok(user);
            }
            return response;
        }
    }
}
