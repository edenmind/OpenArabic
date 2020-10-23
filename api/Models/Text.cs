using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using api.Helpers;

namespace api.Models
{
    public class Text
    {
        public long TextId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string EnglishParagraph { get; set; }
        public string ArabicParagraph { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Sentence> Sentences { get; set; }
        public string TimeAgo => Helpers.TimeAgo.GetTimeAgo(CreatedAt);

    }

}