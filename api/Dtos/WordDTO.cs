using System.Text.Json.Serialization;

namespace api.Dtos {
    public class WordDto {
        public long WordId { get; set; }
        public string English { get; set; }
        public string Arabic { get; set; }

        [JsonIgnore] public SentenceDto Sentence { get; set; }

        public long SentenceId { get; set; }
    }
}
