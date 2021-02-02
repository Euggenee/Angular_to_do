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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace to_do_list.Controllers
{
    [Route("api/priority")]
    [ApiController]
    public class PriorityController : ControllerBase
    {

        private UserContext db;
        public PriorityController(UserContext db)
        {
            this.db = db;
        }

        // GET: api/priority
        [HttpGet]
        public async Task<ActionResult<IList<Priority>>> Get()
        {
            string userIdString = Request.Query.FirstOrDefault(u => u.Key == "userId").Value;
            int? userId = int.Parse(userIdString);

            var priorities = await db.Priorities.Select(p => new 
            {
                Id = p.Id,
                Title = p.Title,
                Color= p.Color,
                UserId = p.UserId
            }).Where(k => k.UserId == userId).ToListAsync();

            if (userId == null)
            {
                return BadRequest();
            }
            return new ObjectResult(priorities);
        }

        // POST: api/priority/add
        [HttpPost, Route("add")]
        public async Task<ActionResult<Priority>>Post(Priority priority) 
        {
            if (priority == null)
            {
                return BadRequest();
            }
            else
            {
                db.Priorities.Add(priority);
            }

            await db.SaveChangesAsync();
            return Ok(priority); 
        }

        //PUT:api/priority/change
        [HttpPut, Route("change")]
        public async Task<ActionResult<Priority>> Put(Priority priority)
        {
            if (priority == null)
            {
                return BadRequest();
            }

            db.Update(priority);
            await db.SaveChangesAsync();
            return Ok(priority);
        }

        //DELETE:api/priority
        [HttpDelete("{id}")]
        public async Task<ActionResult<Priority>> Delete(int id) 
        {
             Priority priority = db.Priorities.FirstOrDefault(x => x.Id == id);

            if (priority == null)
            {
                return NotFound();
            }
            db.Priorities.Remove(priority);
            await db.SaveChangesAsync();
            return Ok(priority.Id);
        }
    }
}
