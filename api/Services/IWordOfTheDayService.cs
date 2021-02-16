using System.Collections.Generic;

using api.Dtos;

namespace api.Services {
    public interface IWordOfTheDayService {
        WordOfTheDayDTO GetWordOfTheDay ();
    }
}
