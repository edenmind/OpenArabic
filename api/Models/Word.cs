using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models {
    public class Word {
        [Key] public long WordId { get; set; }

        public string English { get; set; }
        public string Arabic { get; set; }

        [JsonIgnore] public Sentence Sentence { get; set; }

        public long SentenceId { get; set; }
    }
}
