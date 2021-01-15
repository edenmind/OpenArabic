using System.Collections.Generic;
using System.Threading.Tasks;

using api.Models;
using api.ResourceParameters;
using api.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TextsController : ControllerBase {
        private readonly ITextService _textService;

        public TextsController (ITextService textService) {
            _textService = textService;
        }

        // GET: api/Texts
        [AllowAnonymous]
        [HttpGet ()]
        public async Task<ActionResult<IEnumerable<Text>>> GetTexts ([FromQuery] TextResourceParameters textRequest) {

            var texts = await _textService.GetTextsAsync (textRequest);
            return Ok (texts);

        }

        // GET: api/Texts/5
        [AllowAnonymous]
        [HttpGet ("{id}")]
        public async Task<ActionResult<Text>> GetText (long id) {

            var text = await _textService.GetTextAsync (id);

            if (text == null) {
                return NotFound ();
            }

            return Ok (text);

        }

        // PUT: api/Texts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutText (long id, [FromBody] Text text) {

            if (id != text.TextId) {
                return BadRequest ();
            }

            var textFromService = await _textService.GetTextAsync (id);
            if (textFromService == null) {
                return NotFound ();
            }

            await _textService.PutTextAsync (id, text);

            return NoContent ();
        }

        // POST: api/Texts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Text>> PostText (Text text) {

            await _textService.PostTextAsync (text);

            return CreatedAtAction ("GetText", new { id = text.TextId }, text);
        }

        // DELETE: api/Texts/5
        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteText (long id) {

            var textFromService = await _textService.GetTextAsync (id);
            if (textFromService == null) {
                return NotFound ();
            }

            await _textService.DeleteTextAsync (id);

            return NoContent ();
        }
    }
}
