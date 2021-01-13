using System.Collections.Generic;

namespace to_do_list.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
