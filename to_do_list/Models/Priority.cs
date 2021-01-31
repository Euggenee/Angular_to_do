using System;
using System.Collections.Generic;


namespace to_do_list.Models
{
    public class Priority
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }

        public Priority() { }

        public Priority(int id, string title, string color)
        {
            this.Id = id;
            this.Title = title;
            this.Color = color;
        }
    }
}
