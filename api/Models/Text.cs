using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models {
    public class Text {
        [Key] public long TextId { get; set; }

        [StringLength (50)] public string Title { get; set; }

        [StringLength (50)] public string Author { get; set; }

        [StringLength (50)] public string Editor { get; set; }

        [StringLength (50)] public string Source { get; set; }

        [StringLength (50)] public string Category { get; set; }

        [StringLength (50)] public string Status { get; set; }

        public string ArabicText { get; set; }
        public string EnglishText { get; set; }

        [NotMapped] public List<Related> RelatedTexts { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<Sentence> Sentences { get; set; }
    }
}
