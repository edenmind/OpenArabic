using System.Collections.Generic;
using System.Threading.Tasks;

using api.Dtos;
using api.Models;
using api.ResourceParameters;

namespace api.Services {
    public interface ITextService {
        Task DeleteTextAsync (long id);
        Task<TextDto> GetTextAsync (long id);
        Task<IEnumerable<TextDto>> GetTextsAsync (TextResourceParameters textRequest);
        Task<IEnumerable<TextDto>> GetTextsAuthorAsync (TextResourceParameters textRequest);
        Task<IEnumerable<TextDto>> GetTextsCategoryAsync (TextResourceParameters textRequest);
        Task<int> GetTotalCount ();
        Task<int> GetTotalCountAuthor (string author);
        Task<int> GetTotalCountCategory (string category);
        Task<long> PostTextAsync (Text text);
        Task PutTextAsync (long id, Text text);
    }
}
