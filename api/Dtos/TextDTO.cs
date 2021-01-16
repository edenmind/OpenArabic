using System;
using System.Collections.Generic;

using api.Models;

namespace api.Dtos {
    class TextDTO {
        public long TextId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Editor { get; set; }
        public string Source { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string ArabicText { get; set; }
        public string EnglishText { get; set; }
        public List<RelatedDTO> RelatedTexts { get; set; }
        public DateTime CreatedAt { get; set; }
        public string TimeAgo => Helpers.TimeAgo.GetTimeAgo (CreatedAt);
        public List<SentenceDTO> Sentences { get; set; }
    }
}
