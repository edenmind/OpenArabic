using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }

        public DbSet<Text> Texts { get; set; }
        public DbSet<Sentence> Sentences { get; set; }
        public DbSet<Word> Words { get; set; }
    }
}