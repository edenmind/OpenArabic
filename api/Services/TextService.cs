using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using api.Dtos;
using api.Enums;
using api.Models;
using api.ResourceParameters;

using AutoMapper;

using Microsoft.EntityFrameworkCore;

namespace api.Services {

    public class TextService : ITextService {
        private readonly ApiContext _context;
        private readonly IMapper _mapper;

        public TextService (ApiContext context, IMapper mapper) {
            _context = context ??
                throw new ArgumentNullException (nameof (context));
            _mapper = mapper ??
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

            var textsFromPersistence = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .OrderByDescending (t => t.CreatedAt)
                .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();

            // Map to DTO
            // Compute additionial properties from helpers
            // Gather additional data from microservices

            return textsFromPersistence;
        }

        public async Task<TextDTO> GetTextAsync (long id) {

            var persistedText = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .Where (t => t.TextId == id)
                .FirstAsync ();

            var textDTOMappedFromPersistedText = _mapper.Map<TextDTO> (persistedText);

            const int numberOfRelatedTexts = 7;

            var relatedTextsInSameCategory = await _context.Texts
                .Where (c => c.Category == persistedText.Category)
                .Where (i => i.TextId != id)
                .Take (numberOfRelatedTexts)
                .ToListAsync ();

            var relatedTextsToAdd = new List<RelatedDTO> ();

            foreach (var relatedText in relatedTextsInSameCategory) {
                relatedTextsToAdd.Add (new RelatedDTO {
                    TextId = relatedText.TextId,
                        Title = relatedText.Title
                });
            }

            textDTOMappedFromPersistedText.RelatedTexts = relatedTextsToAdd;

            return textDTOMappedFromPersistedText;
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
