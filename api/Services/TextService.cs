using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using api.Models;
using api.ResourceParameters;

using Microsoft.EntityFrameworkCore;

namespace api.Services {
    public class TextService : ITextService {
        private readonly ApiContext _context;

        public TextService (ApiContext context) => _context = context;

        public async Task<IEnumerable<Text>> GetTextsAsync (TextResourceParameters textRequest) {

            if (!string.IsNullOrEmpty (textRequest.Category)) {
                return await _context.Texts
                    .Include (s => s.Sentences)
                    .ThenInclude (w => w.Words)
                    .Where (t => t.Category.Equals (textRequest.Category))
                    .Where (t => t.Status.Equals ("Published"))
                    .OrderByDescending (t => t.CreatedAt)
                    .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                    .Take (textRequest.PageSize)
                    .ToListAsync ();
            }

            if (!String.IsNullOrEmpty (textRequest.Author)) {
                return await _context.Texts
                    .Include (s => s.Sentences)
                    .ThenInclude (w => w.Words)
                    .Where (t => t.Author.Equals (textRequest.Author))
                    .OrderByDescending (t => t.CreatedAt)
                    .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                    .Take (textRequest.PageSize)
                    .ToListAsync ();
            }

            return await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .OrderByDescending (t => t.CreatedAt)
                .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();
        }

        public async Task<Text> GetTextAsync (long id) {

            var text = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .Where (t => t.TextId == id)
                .FirstAsync ();

            var category = text.Category;

            var relatedTexts = await _context.Texts
                .Where (c => c.Category == category)
                .Where (i => i.TextId != id)
                .Take (7)
                .ToListAsync ();

            var relatedTextsToAdd = new List<Related> ();

            foreach (var relatedText in relatedTexts) {
                relatedTextsToAdd.Add (new Related {
                    TextId = relatedText.TextId,
                        Title = relatedText.Title
                });
            }

            text.RelatedTexts = relatedTextsToAdd;

            // if (text == null) {
            //     return NotFound ();
            // }

            return text;
        }

        public async Task<long> PostTextAsync (Text text) {

            text.CreatedAt = DateTime.Now;

            _context.Texts.Add (text);
            await _context.SaveChangesAsync ();

            return text.TextId;
            // return CreatedAtAction ("GetText", new { id = text.TextId }, text);
        }

        public async Task PutTextAsync (long id, Text text) {

            // if (id != text.TextId) {
            //     return BadRequest ();
            // }

            _context.Entry (text).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            }
            catch (DbUpdateConcurrencyException) {
                if (!TextExists (id)) {
                    // return NotFound ();
                }
                else {
                    throw;
                }
            }

        }

        public async Task DeleteTextAsync (long id) {

            var text = await _context.Texts
                .Include (s => s.Sentences)
                .FirstAsync (x => x.TextId == id);

            // if (text == null) {
            //     return NotFound ();
            // }

            _context.Texts.Remove (text);
            await _context.SaveChangesAsync ();

            // return NoContent ();
        }

        private bool TextExists (long id) => _context.Texts.Any (e => e.TextId == id);

    }
}
