using Microsoft.EntityFrameworkCore;
using BookmarksReactHw.data;   

namespace BookmarksReactHw.Data
{
    public class URLDbContext : DbContext
    {
        private readonly string _connectionString;

        public URLDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}