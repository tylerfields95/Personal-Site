using Microsoft.EntityFrameworkCore;
using PersonalSite.Api.Models;
using System.Reflection.Metadata;

namespace PersonalSite.Api
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<BlogContent> BlogsContent { get; set; }
    }
}
