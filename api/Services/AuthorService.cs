using System.Collections.Generic;
using api.Models;

namespace api.Services
{
    public class AuthorService : IAuthorService
    {
        private readonly List<Author> Authors;

        private readonly List<string> ListOfAuthorsNames = new()
        {
            "Ibrahim ibn al-Mundhir",
            "Ibn Qudāmah al-Maqdīsī",
            "Abdur Raūf Al-Manāwi",
            "al-Ġazālī",
            "al-Fuḍayl ibn ʻIyāḍ",
            "al-Hasan al-Basri",
            "Ibn Taymiyyah",
            "Ibn Qayyim al-Jawziyya",
            "Ibn Rajab al-Hanbali",
            "Imām Aḥmad ibn Ḥanbal",
            "Imām al-Shāfiʿī",
            "Imām Mālik ibn Anas",
            "Imām Nawawī",
            "Muhammad al-Bukhari",
            "Ibn Kathīr",
            "Ibn Ḥajar al-ʿAsqalānī",
            "Abu Abdullah Al-Qurtubi",
            "Muhammad ibn Jarir al-Tabari",
            "Ibn al-Jawzī",
            "Shams ad-Dīn adh-Dhahabī"
        };

        public List<Author> GetAuthors()
        {
            var index = 0;

            foreach (var author in ListOfAuthorsNames)
            {
                Authors.Add(new Author {Name = author, AuthorId = index});
                index++;
            }

            return Authors;
        }
    }
}