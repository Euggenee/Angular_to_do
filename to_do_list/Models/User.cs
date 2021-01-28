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
        public virtual ICollection<Priority> Priorities { private get; set; }
        public virtual ICollection<Category> Categories { private get; set; }

        public User() { }
        public User(int id, string email)
        {
            this.Id = id;
            this.Email = email;
        }
        public User(int id, string name, string email, ICollection<Task> tasks)
        {
            this.Id = id;
            this.Name = name;
            this.Email = email;
            this.Tasks = tasks;
        }
    }
}
