using System.Collections.Generic;
using System.Threading.Tasks;

using api.Dtos;
using api.Models;
using api.ResourceParameters;

namespace api.Services {
    public interface ITextService {
        Task DeleteTextAsync (long id);
        Task<TextDTO> GetTextAsync (long id);
        Task<IEnumerable<TextDTO>> GetTextsAsync (TextResourceParameters textRequest);
        Task<IEnumerable<TextDTO>> GetTextsAuthorAsync (TextResourceParameters textRequest);
        Task<IEnumerable<TextDTO>> GetTextsCategoryAsync (TextResourceParameters textRequest);
        Task<int> GetTotalCount ();
        Task<int> GetTotalCountAuthor (string author);
        Task<int> GetTotalCountCatgory (string category);
        Task<long> PostTextAsync (Text text);
        Task PutTextAsync (long id, Text text);
    }
}
