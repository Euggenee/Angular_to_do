using System;

namespace to_do_list.Models
{
    public class Task
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public bool? Complited { get; set; }
        public int? PriorityId { get; set; }
        public virtual Priority Priority { get; set; }
        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public DateTime? Date { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public Task() { }

        public Task(int id, string title, bool? complited, DateTime? date, Priority priority, Category category )
        {
            this.Id = id;
            this.Title = title;
            this.Complited = complited;
            this.Date = date;
            this.Priority = priority;
            this.Category = category;
        }
    }
}
