using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using api.Enums;
using api.Models;
using api.ResourceParameters;

using Microsoft.EntityFrameworkCore;

namespace api.Services {

    public class TextService : ITextService {
        private readonly ApiContext _context;

        public TextService (ApiContext context) {
            _context = context ??
                throw new ArgumentNullException (nameof (context));
        }

        public async Task<IEnumerable<Text>> GetTextsCategoryAsync (TextResourceParameters textRequest) {

            return await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .Where (t => t.Category.Equals (textRequest.Category))
                .Where (t => t.Status.Equals (PublishStates.Published.ToString ()))
                .OrderByDescending (t => t.CreatedAt)
                .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();
        }

        public async Task<IEnumerable<Text>> GetTextsAuthorAsync (TextResourceParameters textRequest) {
            return await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .Where (t => t.Author.Equals (textRequest.Author))
                .OrderByDescending (t => t.CreatedAt)
                .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();
        }

        public async Task<IEnumerable<Text>> GetTextsAsync (TextResourceParameters textRequest) {

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

            const int numberOfRelatedTexts = 7;

            var relatedTextsInSameCategory = await _context.Texts
                .Where (c => c.Category == text.Category)
                .Where (i => i.TextId != id)
                .Take (numberOfRelatedTexts)
                .ToListAsync ();

            var relatedTextsToAdd = new List<Related> ();

            foreach (var relatedText in relatedTextsInSameCategory) {
                relatedTextsToAdd.Add (new Related {
                    TextId = relatedText.TextId,
                        Title = relatedText.Title
                });
            }

            text.RelatedTexts = relatedTextsToAdd;

            return text;
        }

        public async Task<long> PostTextAsync (Text text) {

            text.CreatedAt = DateTime.Now;

            _context.Texts.Add (text);
            await _context.SaveChangesAsync ();

            return text.TextId;
        }

        public async Task PutTextAsync (long id, Text text) {

            _context.Entry (text).State = EntityState.Modified;

            await _context.SaveChangesAsync ();

        }

        public async Task DeleteTextAsync (long id) {

            var text = await _context.Texts
                .Include (s => s.Sentences)
                .FirstAsync (x => x.TextId == id);

            _context.Texts.Remove (text);

            await _context.SaveChangesAsync ();
        }

        public async Task<int> GetTotalCount () {

            var texts = await _context.Texts
                .ToListAsync ();

            var totalNumberOfTexts = texts.Count;

            return totalNumberOfTexts;

        }
    }
}
