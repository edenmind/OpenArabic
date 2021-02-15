using System.Collections.Generic;

using api.Dtos;

namespace api.Services {

    public class WordOfTheDayService : IWordOfTheDayService {

        public IEnumerable<WordOfTheDayDTO> GetWordOfTheDay () {

            List<WordOfTheDayDTO> wordOfTheDays = new ();

            wordOfTheDays.Add (new WordOfTheDayDTO {
                Arabic = "dhalika", Meaning = "That", Transliteration = "dhalika", TypeOfWord = "noun"
            });

            return wordOfTheDays;

        }
    }
}
