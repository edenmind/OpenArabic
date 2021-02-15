using System;

namespace api.Dtos {
    public class ChangelogDTO {
        public long ChangelogId { get; set; }
        public string Title { get; set; }
        public string CreatedAt { get; set; }
        public string Description { get; set; }
    }
}
