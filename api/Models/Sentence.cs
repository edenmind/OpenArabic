using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models
{
    public abstract class Sentence
    {
        [Key] public long SentenceId { get; set; }

        public string English { get; set; }
        public string Arabic { get; set; }

        [JsonIgnore] public Text Text { get; set; }

        public long TextId { get; set; }
        public int Order { get; set; }
        public List<Word> Words { get; set; }
    }
}