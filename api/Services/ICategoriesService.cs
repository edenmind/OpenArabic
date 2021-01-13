using System.Collections.Generic;

using api.Models;

namespace api.Services {
    public interface ICategoriesService {
        List<Category> GetCategories ();
    }
}
