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
    }
}
