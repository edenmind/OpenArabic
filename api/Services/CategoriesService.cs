using System.Collections.Generic;

using api.Models;

namespace api.Services {
    public class CategoriesService : ICategoriesService {

        private readonly List<string> _listOfCategories = new () {
            "Adab",
            "ʿAqīdah",
            "Fiqh",
            "Hadīth",
            "ʿIbādah",
            "ʿIlm",
            "Minhadj",
            "Qurʼān",
            "Sīrah",
            "Tafsīr",
            "Tawhīd"
        };

        public List<Category> GetCategories () {
            var index = 0;

            List<Category> categories = new ();

            foreach (var category in _listOfCategories) {
                categories.Add (new Category { Name = category, CategroyId = index });
                index++;
            }

            return categories;
        }
    }
}
