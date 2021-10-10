using System;
using System.Collections.Generic;

namespace api.Dtos {
    public class TextDto {
        public long TextId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Editor { get; set; }
        public string Source { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string ArabicText { get; set; }
        public string EnglishText { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<RelatedDto> RelatedTexts { get; set; }
        public VocabularyCollectionDto VocabularyCollection { get; set; }
        public List<SentenceDto> Sentences { get; set; }

        // computed propertis not present in the persisted model
        public string TimeAgo => Helpers.TimeAgo.GetTimeAgo (CreatedAt);
        public string ReadTime => Helpers.ReadTime.GetReadTime (ArabicText.Length);
    }
}
