namespace api.Dtos {
    public class WordOfTheDayDTO {
        public long WordOfTheDayId { get; set; }
        public string Arabic { get; set; }
        public string Meaning { get; set; }
        public string Transliteration { get; set; }
        public string TypeOfWord { get; set; }
        public string QuranArabic { get; set; }
        public string QuranEnglish { get; set; }
        public int Day { get; set; }
    }
}
