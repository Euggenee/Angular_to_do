using Microsoft.EntityFrameworkCore;


namespace to_do_list.Models
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Category> Categories { get; set; }
        public UserContext(DbContextOptions<UserContext> options) : base(options)

        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }
    }
}
