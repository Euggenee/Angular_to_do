using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Immutable;
using Microsoft.Extensions.Configuration;
using System;
using to_do_list.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Internal;

namespace to_do_list.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private UserContext db;
        public UserController(UserContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Authorize]

        public async Task<ActionResult<IList<User>>> Get()
        {
            var users = db.Users.Select(u =>
            new User { Id = u.Id, Name = u.Name, Email = u.Email, Tasks = u.Tasks })
                .ToListAsync();

            return await users;
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
             var user = await db.Users.Select(u => new 
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Tasks = u.Tasks.Select(t => new  
                {
                    Id = t.Id,
                    Title = t.Title,
                    Complited = t.Complited,
                    Date= t.Date,
                    Priority = t.Priority,
                    Category = t.Category
                }).ToList()
            }).FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
                return NotFound();

            return new ObjectResult(user);
        }

        // POST api/user/
        [HttpPost]
        public async Task<ActionResult<User>> Post(User user)
        {
            bool initial = await db.Users.Select(x => x.Email).ContainsAsync(user.Email);

            if (user == null)
            {
                return BadRequest();
            }
            if (initial == true)
            {
                return Conflict("User with this Email already exsist");
            }
            else if (initial == false)
            {
                db.Users.Add(user);
            }

            await db.SaveChangesAsync();
            return Ok(user);
        }

        // PUT api/user/
        [HttpPut]
        public async Task<ActionResult<User>> Put(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (!db.Users.Any(x => x.Id == user.Id))
            {
                return NotFound();
            }

            db.Update(user);
            await db.SaveChangesAsync();
            return Ok(user);
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            User user = db.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            db.Users.Remove(user);
            await db.SaveChangesAsync();
            return Ok($"user.Id {user.Id}");
        }
    }
}