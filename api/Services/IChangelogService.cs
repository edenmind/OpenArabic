using System.Collections.Generic;

using api.Dtos;

namespace api.Services {
    public interface IChangelogService {
        IEnumerable<ChangelogDto> GetChangelog ();
    }
}
