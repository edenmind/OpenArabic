using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

using api.Dtos;
using api.Models;
using api.ResourceParameters;
using api.Services;
using api.Validators;

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
        public async Task<ActionResult<IEnumerable<TextDTO>>> GetTexts ([FromQuery] TextResourceParameters textRequest) {

            IEnumerable<TextDTO> textFromRepo;

            int totalCount;

            if (!string.IsNullOrWhiteSpace (textRequest.Category)) {
                textFromRepo = await _textService.GetTextsCategoryAsync (textRequest);
                totalCount = await _textService.GetTotalCountCatgory (textRequest.Category);
            }
            else if (!string.IsNullOrWhiteSpace (textRequest.Author)) {
                textFromRepo = await _textService.GetTextsAuthorAsync (textRequest);
                totalCount = await _textService.GetTotalCountAuthor (textRequest.Author);
            }
            else {
                textFromRepo = await _textService.GetTextsAsync (textRequest);
                totalCount = await _textService.GetTotalCount ();
            }

            var totalCountString = totalCount.ToString ();

            Response.Headers.Add ("Access-Control-Expose-Headers", "X-Total-Count");
            Response.Headers.Add ("X-Total-Count", totalCountString);

            return Ok (_mapper.Map<IEnumerable<TextDTO>> (textFromRepo));

        }

        // GET: api/Texts/5
        [AllowAnonymous]
        [HttpGet ("{id}")]
        public async Task<ActionResult<TextDTO>> GetText (long id) {

            var textFromRepo = await _textService.GetTextAsync (id);

            if (textFromRepo == null) {
                return NotFound ();
            }

            return Ok (textFromRepo);

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

            TextValidator validator = new ();

            var validationResult = validator.Validate (text);

            if (!validationResult.IsValid) {
                return BadRequest ();
            }

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
