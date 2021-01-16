using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using api.Dtos;
using api.Models;
using api.ResourceParameters;
using api.Services;

using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TextsController : ControllerBase {
        private readonly ITextService _textService;
        private readonly IMapper _mapper;

        public TextsController (ITextService textService, IMapper mapper) {
            _textService = textService ??
                throw new ArgumentNullException (nameof (textService));
            _mapper = mapper ??
                throw new ArgumentNullException (nameof (mapper));
        }

        // GET: api/Texts
        [AllowAnonymous]
        [HttpGet ()]
        public async Task<ActionResult<IEnumerable<Text>>> GetTexts ([FromQuery] TextResourceParameters textRequest) {

            IEnumerable<Text> textsFromRepo;

            if (!string.IsNullOrEmpty (textRequest.Category)) {
                textsFromRepo = await _textService.GetTextsCategoryAsync (textRequest);
            }
            else if (!string.IsNullOrEmpty (textRequest.Author)) {
                textsFromRepo = await _textService.GetTextsAuthorAsync (textRequest);
            }
            else {
                textsFromRepo = await _textService.GetTextsAsync (textRequest);
            }

            return Ok (_mapper.Map<IEnumerable<TextDTO>> (textsFromRepo));

        }

        // GET: api/Texts/5
        [AllowAnonymous]
        [HttpGet ("{id}")]
        public async Task<ActionResult<Text>> GetText (long id) {

            var textFromRepo = await _textService.GetTextAsync (id);

            if (textFromRepo == null) {
                return NotFound ();
            }

            return Ok (_mapper.Map<TextDTO> (textFromRepo));

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
