using System.Collections.Generic;

using api.Models;

namespace api.Services {

    public class CategoriesService : ICategoriesService {

        private readonly List<Category> Categories;

        private readonly List<string> ListOfCategories = new () {
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

            foreach (var category in ListOfCategories) {
                Categories.Add (new Category () { Name = category, CategroyId = index });
                index++;
            }

            return Categories;

        }

    }
}
