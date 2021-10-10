using System.Collections.Generic;
using System.Threading.Tasks;

using api.Dtos;

namespace api.Services {
    public interface IIssueService {
        Task<IEnumerable<IssueDto>> GetIssuesAsync ();
    }
}
