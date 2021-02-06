using System.Text.Json.Serialization;

namespace api.Dtos
{
    public class WordDTO
    {
        public long WordId { get; set; }
        public string English { get; set; }
        public string Arabic { get; set; }

        [JsonIgnore] public SentenceDTO Sentence { get; set; }

        public long SentenceId { get; set; }
    }
}