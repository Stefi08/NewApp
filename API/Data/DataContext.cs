using Microsoft.EntityFrameworkCore;


namespace API.App
    

{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<AppUser> Users { get; set; }
    }
}
