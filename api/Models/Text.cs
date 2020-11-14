using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Text
    {
        public long TextId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Editor { get; set; }
        public string Source { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string ArabicText { get; set; }
        public string EnglishText { get; set; }
        [NotMapped]
        public List<Related> RelatedTexts { get; set; }
        public DateTime CreatedAt { get; set; }
        public string TimeAgo => Helpers.TimeAgo.GetTimeAgo(CreatedAt);
        public List<Sentence> Sentences { get; set; }
    }
}