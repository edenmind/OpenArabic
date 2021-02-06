using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Author
    {
        [Key] public long AuthorId { get; set; }

        [StringLength(50)] public string Name { get; set; }
    }
}