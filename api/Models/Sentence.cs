using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Sentence
    {
        public long SentenceId { get; set; }
        public string English { get; set; }
        public string Arabic { get; set; }
        [JsonIgnore]
        public Text Text { get; set; }
        public long TextId { get; set; }
        public List<Word> Words { get; set; }
    }
}