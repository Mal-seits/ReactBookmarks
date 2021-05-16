
using System.IO;
using BookmarksReactHw.data;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BookmarksReactHw.Data
{
    public class URLDbContextFactory : IDesignTimeDbContextFactory<URLDbContext>
    {
        public URLDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}BookmarksReactHw.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new URLDbContext(config.GetConnectionString("ConStr"));
        }
    }
}