using System.Collections.Generic;

using api.Dtos;
using api.Helpers;

namespace api.Services {

    public class WordOfTheDayService : IWordOfTheDayService {

        public WordOfTheDayDTO GetWordOfTheDay () {

            List<WordOfTheDayDTO> wordOfTheDays = new ();

            var hijriDate = HijriDate.GetHijriDate ();

            wordOfTheDays.Add (new WordOfTheDayDTO {
                Day = 1,
                    Arabic = "ذلك",
                    Meaning = "that, which or that one",
                    Transliteration = "dhâlika",
                    TypeOfWord = "noun",
                    QuranArabic = "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
                    QuranEnglish = "\"That is the Book! There is no doubt about it — a guide for those mindful of Allah.\" (al-Baqarah 2:2)",
                    HijriDate = hijriDate
            });

            return wordOfTheDays[0];

        }
    }
}
