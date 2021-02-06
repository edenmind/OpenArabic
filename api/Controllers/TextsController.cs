using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;
using api.ResourceParameters;
using api.Services;
using api.Validators;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static System.String;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TextsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly ITextService _textService;

        public TextsController(ITextService textService, IMapper mapper, IMediator mediator)
        {
            _textService = textService ?? throw new ArgumentNullException(nameof(textService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        // GET: api/Texts
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TextDTO>>> GetTexts([FromQuery] TextResourceParameters textRequest)
        {
            IEnumerable<TextDTO> textFromRepo;

            int totalCount;

            if (!IsNullOrWhiteSpace(textRequest.Category))
            {
                textFromRepo = await _textService.GetTextsCategoryAsync(textRequest);
                totalCount = await _textService.GetTotalCountCategory(textRequest.Category);
            }
            else if (!IsNullOrWhiteSpace(textRequest.Author))
            {
                textFromRepo = await _textService.GetTextsAuthorAsync(textRequest);
                totalCount = await _textService.GetTotalCountAuthor(textRequest.Author);
            }
            else
            {
                textFromRepo = await _textService.GetTextsAsync(textRequest);
                totalCount = await _textService.GetTotalCount();
            }
            
            Response.Headers.Add("Access-Control-Expose-Headers", "X-Total-Count");
            Response.Headers.Add("X-Total-Count", totalCount.ToString());

            return Ok(_mapper.Map<IEnumerable<TextDTO>>(textFromRepo));
        }

        // GET: api/Texts/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<TextDTO>> GetText(long id)
        {
            var textFromRepo = await _textService.GetTextAsync(id);

            if (textFromRepo == null) return NotFound();

            return Ok(textFromRepo);
        }

        // PUT: api/Texts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutText(long id, [FromBody] Text text)
        {
            if (id != text.TextId) return BadRequest();

            var textFromService = await _textService.GetTextAsync(id);

            if (textFromService == null) return NotFound();

            await _textService.PutTextAsync(id, text);

            return NoContent();
        }

        // POST: api/Texts
        [HttpPost]
        public async Task<ActionResult<Text>> PostText(Text text)
        {
            TextValidator validator = new();

            var validationResult = await validator.ValidateAsync(text);

            if (!validationResult.IsValid) return BadRequest();

            await _textService.PostTextAsync(text);

            return CreatedAtAction("GetText", new {id = text.TextId}, text);
        }

        // DELETE: api/Texts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteText(long id)
        {
            var textFromService = await _textService.GetTextAsync(id);
            if (textFromService == null) return NotFound();

            await _textService.DeleteTextAsync(id);

            return NoContent();
        }
    }
}