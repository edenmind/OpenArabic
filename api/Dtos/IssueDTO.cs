using System;
using System.Collections.Generic;

using Octokit;

namespace api.Dtos {
    public class IssueDTO {
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public string Url { get; set; }
        public int Id { get; set; }
        public int Number { get; set; }
        public string UserLogin { get; set; }
        public string UserHtmlUrl { get; set; }
        public DateTimeOffset? MilestoneDueOn { get; set; }
        public string MilestoneHtmlUrl { get; set; }
        public string MilestoneTitle { get; set; }
    }
}
