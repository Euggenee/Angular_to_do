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
    [Route("api/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private UserContext db;
        public TaskController(UserContext db)
        {
            this.db = db;
        }

        // GET: api/task
        [HttpGet]
        public async Task<ActionResult<IList<Models.Task>>> Get()
        {
            string userIdString = Request.Query.FirstOrDefault(u => u.Key == "userId").Value;
            int? userId = int.Parse(userIdString);

            var tasks = await db.Tasks.Select(t => new
            {
                Id = t.Id,
                Title = t.Title,
                Complited = t.Complited,
                Date = t.Date,
                Priority = new
                {
                    Id = t.Priority.Id,
                    Title = t.Priority.Title,
                    Color = t.Priority.Color
                },
                Category = new
                {
                    Id = t.Category.Id,
                    Title = t.Category.Title,
                    UserId = t.Category.UserId
                },
                UserId = t.UserId
            }).Where(k => k.UserId == userId).ToListAsync();

            if (userId == null)
            {
                return BadRequest();
            }
            return new ObjectResult(tasks);
        }


        // POST api/task/add
        [HttpPost, Route("add")]
        public async Task<ActionResult<Models.Task>> Post(Models.Task task)
        {
            var tempTask = new Models.Task
            {
                Title = task.Title,
                Complited = task.Complited,
                PriorityId = (from Priority in db.Priorities
                                     where Priority.Id == task.Priority.Id
                                     select Priority.Id).First(),
                CategoryId = (from Category in db.Categories
                                     where Category.Id == task.Category.Id
                                     select Category.Id).First(),
                Date = task.Date,
                UserId = task.UserId
            }; 

            if (task == null)
            {
                return BadRequest();
            }
            else
            {
                db.Tasks.Add((Models.Task)tempTask);
            }
            await db.SaveChangesAsync();
            return Ok();
        }

        // PUT api/task/change
        [HttpPut, Route("change")]
        public async Task<ActionResult<User>> Put(Models.Task task)
        {
            var tempTask = new Models.Task
            {
                Id = task.Id,
                Title = task.Title,
                Complited = task.Complited,
                PriorityId = (from Priority in db.Priorities
                              where Priority.Id == task.Priority.Id
                              select Priority.Id).First(),
                CategoryId = (from Category in db.Categories
                              where Category.Id == task.Category.Id
                              select Category.Id).First(),
                Date = task.Date,
                UserId = task.UserId
            };

            if (task == null)
            {
                return BadRequest();
            }
            else 
            {
                db.Update(tempTask);
            }

            await db.SaveChangesAsync();
            return Ok(tempTask);
        }
    }
}
