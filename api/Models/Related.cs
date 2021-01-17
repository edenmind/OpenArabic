using System.ComponentModel.DataAnnotations;

namespace api.Models {
    // Texts that are related to the current text
    public class Related {
        [StringLength (50)]
        public string Title { get; set; }
        public long TextId { get; set; }
    }
}
