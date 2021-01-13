using System.Collections.Generic;

using api.Models;

namespace api.Services {
    public interface IAuthorService {
        List<Author> GetAuthors ();
    }
}
