using System.Collections.Generic;
using System.Threading.Tasks;

using api.Dtos;
using api.Models;
using api.ResourceParameters;

namespace api.Services {
    public interface ITextService {
        Task DeleteTextAsync (long id);
        Task<TextDTO> GetTextAsync (long id);
        Task<IEnumerable<Text>> GetTextsAsync (TextResourceParameters textRequest);
        Task<IEnumerable<Text>> GetTextsAuthorAsync (TextResourceParameters textRequest);
        Task<IEnumerable<Text>> GetTextsCategoryAsync (TextResourceParameters textRequest);
        Task<long> PostTextAsync (Text text);
        Task PutTextAsync (long id, Text text);
        Task<int> GetTotalCount ();
    }
}
