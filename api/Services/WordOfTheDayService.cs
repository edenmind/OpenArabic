using System.Collections.Generic;

using api.Dtos;

namespace api.Services {

    public class WordOfTheDayService : IWordOfTheDayService {

        public WordOfTheDayDTO GetWordOfTheDay () {

            List<WordOfTheDayDTO> wordOfTheDays = new ();

            wordOfTheDays.Add (new WordOfTheDayDTO {
                Day = 1,
                    Arabic = "ذلك",
                    Meaning = "that, which or that one",
                    Transliteration = "dhâlika",
                    TypeOfWord = "noun",
                    QuranArabic = "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
                    QuranEnglish = "\"That is the Book! There is no doubt about it — a guide for those mindful of Allah.\" (al-Baqarah 2:2)"
            });

            return wordOfTheDays[0];

        }
    }
}
