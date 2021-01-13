using System.Collections.Generic;


namespace to_do_list.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
