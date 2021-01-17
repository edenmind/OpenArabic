using System.ComponentModel.DataAnnotations;

namespace api.Models {
    public class Mail {
        [StringLength (1000)]
        public string Body { get; set; }

        [StringLength (50)]
        public string Sender { get; set; }
    }
}
