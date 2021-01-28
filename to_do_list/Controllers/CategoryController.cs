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
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private UserContext db;
        public CategoryController(UserContext db)
        {
            this.db = db;
        }

        // GET: api/category
        [HttpGet]
       
        public async Task<ActionResult<IList<Category>>> Get()
        {
            string userIdString = Request.Query.FirstOrDefault(u => u.Key == "userId").Value;
            int? userId = int.Parse(userIdString);

            var categories = await db.Categories.Select(c => new 
            {
                Id = c.Id,
                Title = c.Title,
                UserId = c.UserId
            }).Where(k => k.UserId == userId).ToListAsync();

            if (userId == null)
            {
                return BadRequest();
            }
            return new ObjectResult(categories);
        }

        // GET api/category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> Get(int id)
        {
            var category = await db.Categories.Select(c => new Category
            {
                Id = c.Id,
                Title = c.Title
            }).Where(k => k.Id == id).ToListAsync();

            return new ObjectResult(category);
        }

        // POST api/category/add
        [HttpPost, Route("add")]
        
        public async Task<ActionResult<Category>> Post(Category category)
        {
            if (category == null)
            {
                return BadRequest();
            }
            if(category != null)
            {
             db.Categories.Add(category);
            }
            await db.SaveChangesAsync();
            return Ok(category);
        }
    }
}
