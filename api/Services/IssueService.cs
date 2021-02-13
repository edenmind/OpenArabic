using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using api.Dtos;
using api.Models;

using Octokit;

namespace api.Services {

    public class IssueService : IIssueService {

        public async Task<IEnumerable<IssueDTO>> GetIssuesAsync () {

            var client = new GitHubClient (new ProductHeaderValue ("OpenArabic"));

            var issueFilter = new RepositoryIssueRequest {
                Filter = IssueFilter.All,
                State = ItemStateFilter.Open,
                // Since = DateTimeOffset.Now.Subtract (TimeSpan.FromDays (14))
            };

            const string organization = "Edenmind";
            const string repositoryName = "OpenArabic";

            var issuesFromGithub = await client.Issue.GetAllForRepository (organization, repositoryName, issueFilter);

            var extractedIssueValues = new List<IssueDTO> ();

            foreach (var issue in issuesFromGithub) {

                var issueToAdd = new IssueDTO () {
                    Title = issue.Title,
                    Id = issue.Id,
                    Body = issue.Body,
                    CreatedAt = issue.CreatedAt,
                    Url = issue.HtmlUrl,
                    Number = issue.Number,
                    UserLogin = issue.User.Login,
                    UserHtmlUrl = issue.User.HtmlUrl,
                    MilestoneDueOn = issue.Milestone.DueOn,
                    MilestoneHtmlUrl = issue.Milestone.HtmlUrl,
                    MilestoneTitle = issue.Milestone.Title,
                };

                extractedIssueValues.Add (issueToAdd);

            }

            return extractedIssueValues;
        }
    }
}
