using System.Collections.Generic;


namespace to_do_list.Models
{
    public class Category
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public int? UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }

        public Category() { }

        public Category(int id, string title)
        {
            this.Id = id;
            this.Title = title;
        }
    }
}
