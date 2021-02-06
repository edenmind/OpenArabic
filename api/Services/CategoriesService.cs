using System.Collections.Generic;
using api.Models;

namespace api.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly List<Category> _categories;

        private readonly List<string> _listOfCategories = new()
        {
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

        public List<Category> GetCategories()
        {
            var index = 0;

            foreach (var category in _listOfCategories)
            {
                _categories.Add(new Category {Name = category, CategroyId = index});
                index++;
            }

            return _categories;
        }
    }
}