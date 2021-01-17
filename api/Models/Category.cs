using System.ComponentModel.DataAnnotations;

namespace api.Models {
    public class Category {
        [Key]
        public long CategroyId { get; set; }

        [StringLength (50)]
        public string Name { get; set; }
    }
}
