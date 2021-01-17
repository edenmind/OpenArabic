using System.Collections.Generic;
using System.Text.Json.Serialization;

using api.Models;

namespace api.Dtos {
    public class SentenceDTO {
        public long SentenceId { get; set; }
        public string English { get; set; }
        public string Arabic { get; set; }

        [JsonIgnore]
        public Text Text { get; set; }
        public long TextId { get; set; }
        public int Order { get; set; }
        public List<WordDTO> Words { get; set; }
    }
}
