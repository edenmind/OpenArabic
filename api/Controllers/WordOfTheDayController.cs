using System.Collections.Generic;

using api.Dtos;
using api.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class WordOfTheDayController : ControllerBase {
        private readonly IWordOfTheDayService _wordOfTheDayService;

        public WordOfTheDayController (IWordOfTheDayService wordOfTheDayService) {
            _wordOfTheDayService = wordOfTheDayService;
        }

        // GET: api/Authors
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<WordOfTheDayDTO>> GetChangelog () {
            return Ok (_wordOfTheDayService.GetWordOfTheDay ());
        }
    }
}
