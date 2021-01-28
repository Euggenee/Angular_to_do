using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using to_do_list.Models;


namespace to_do_list.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserContext db;

        public AuthController(UserContext db)
        {
            this.db = db;
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody]LoginModel user) 
        {
            bool password = await db.Users.Select(p => p.Password).ContainsAsync(user.Password);
            bool email = await db.Users.Select(e =>e.Email).ContainsAsync(user.Email);
            User userData = await db.Users.Select(s =>new User(s.Id, s.Email){ Id = s.Id, Email = s.Email }).FirstOrDefaultAsync(email => email.Email == user.Email);
           
            if (user == null)
                return BadRequest("Invalid client reques");

            if (password && email)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signingCredentials
                    );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenString, user = userData });
            }
            return Unauthorized();
        }
    }
}
