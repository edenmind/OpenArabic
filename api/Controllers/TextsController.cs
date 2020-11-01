using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TextsController : ControllerBase
    {
        private readonly ApiContext _context;

        public TextsController(ApiContext context)
        {
            _context = context;
        }

        // GET: api/Texts
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Text>>> GetTexts([FromQuery(Name = "category")] string category,
                                                                    [FromQuery(Name = "author")] string author,
                                                                    [FromQuery(Name = "pageSize")] int pageSize = 10,
                                                                    [FromQuery(Name = "pageNumber")] int pageNumber = 1)
        {

            if (!String.IsNullOrEmpty(category))
            {
                return await _context.Texts
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Include(s => s.Sentences)
                .Where(t => t.Category.Contains(category))
                .Where(t => t.Status.Equals("Published"))
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
            }

            if (!String.IsNullOrEmpty(author))
            {
                return await _context.Texts
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Include(s => s.Sentences)
                .Where(t => t.Author.Contains(author))
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
            }

            return await _context.Texts
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Include(s => s.Sentences)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
        }

        // GET: api/Texts/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Text>> GetText(long id)
        {
            var text = await _context.Texts
            .Include(s => s.Sentences)
            .Include(w => w.WordByWord)
            .Where(t => t.TextId == id)
            .FirstAsync();

            if (text == null)
            {
                return NotFound();
            }

            return text;
        }

        // PUT: api/Texts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutText(long id, Text text)
        {
            if (id != text.TextId)
            {
                return BadRequest();
            }

            _context.Entry(text).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TextExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Texts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Text>> PostText(Text text)
        {

            text.CreatedAt = DateTime.Now;

            _context.Texts.Add(text);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetText", new { id = text.TextId }, text);
        }

        // DELETE: api/Texts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteText(long id)
        {
            var text = await _context.Texts.FindAsync(id);
            if (text == null)
            {
                return NotFound();
            }

            _context.Texts.Remove(text);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TextExists(long id)
        {
            return _context.Texts.Any(e => e.TextId == id);
        }
    }
}