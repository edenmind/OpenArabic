using System.Collections.Generic;

using api.Dtos;

namespace api.Services {

    public class ChangelogService : IChangelogService {

        public IEnumerable<ChangelogDTO> GetChangelog () {

            List<ChangelogDTO> changelog = new ();

            changelog.Add (new ChangelogDTO { ChangelogId = 1, CreatedAt = "2020-02-14", Description = "It Works", Title = "The Service" });

            return changelog;

        }
    }
}
