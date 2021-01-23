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

        public async Task<IEnumerable<TextDTO>> GetTextsCategoryAsync (TextResourceParameters textRequest) {

            var texts = await _context.Texts
                .Include (s => s.Sentences.OrderByDescending (s => s.Order))
                .ThenInclude (w => w.Words)
                .Where (t => t.Category.Equals (textRequest.Category))
                .Where (t => t.Status.Equals (PublishStates.Published.ToString ()))
                .OrderByDescending (t => t.CreatedAt)
                .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();

            var textDTOs = _mapper.Map<List<TextDTO>> (texts);

            return textDTOs;
        }

        public async Task<IEnumerable<TextDTO>> GetTextsAuthorAsync (TextResourceParameters textRequest) {
            var texts = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .Where (t => t.Author.Equals (textRequest.Author))
                .OrderByDescending (t => t.CreatedAt)
                .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();

            var textDTOs = _mapper.Map<List<TextDTO>> (texts);

            return textDTOs;
        }

        public async Task<IEnumerable<TextDTO>> GetTextsAsync (TextResourceParameters textRequest) {

            var texts = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .OrderByDescending (t => t.CreatedAt)
                .Skip ((textRequest.PageNumber - 1) * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();

            var textDTOs = _mapper.Map<List<TextDTO>> (texts);

            return textDTOs;
        }

        public async Task<TextDTO> GetTextAsync (long id) {

            var text = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .Where (t => t.TextId == id)
                .FirstAsync ();

            var textDTO = _mapper.Map<TextDTO> (text);

            textDTO.RelatedTexts = await FindRelatedTexts (text);

            textDTO.Vocabulary = ProduceVocabularyList (text);

            return textDTO;
        }

        private static List<VocabularyDTO> ProduceVocabularyList (Text text) {

            List<VocabularyDTO> vocabularies = new ();

            const int numberOfVocabulariesToAdd = 5;

            while (vocabularies.Count < numberOfVocabulariesToAdd) {
                var randomNumber = new Random ();
                var randomSentenceId = randomNumber.Next (0, text.Sentences.Count);
                var vocabulary = GetRandomVocabularyFromSenteces (randomSentenceId, text.Sentences);

                const int minimumWordLength = 2;
                var isWordLengthSatisfied = vocabulary.Arabic.Length > minimumWordLength && vocabulary.English.Length > minimumWordLength;

                var isNewWord = !vocabularies.Contains (vocabulary);

                if (isWordLengthSatisfied && isNewWord) {
                    vocabularies.Add (vocabulary);
                }
            }

            return vocabularies;
        }

        private static VocabularyDTO GetRandomVocabularyFromSenteces (int randomSentenceId, List<Sentence> sentences) {

            VocabularyDTO vocabularyDTO = new ();

            var random = new Random ();
            var ranndomWordId = random.Next (0, sentences[randomSentenceId].Words.Count);

            vocabularyDTO.English = sentences[randomSentenceId].Words[ranndomWordId].English;
            vocabularyDTO.Arabic = sentences[randomSentenceId].Words[ranndomWordId].Arabic;

            return vocabularyDTO;
        }

        private async Task<List<RelatedDTO>> FindRelatedTexts (Text text) {
            const int numberOfRelatedTextsToAdd = 7;

            var relatedTextsInSameCategory = await _context.Texts
                .Where (c => c.Category == text.Category)
                .Where (i => i.TextId != text.TextId)
                .Take (numberOfRelatedTextsToAdd)
                .ToListAsync ();

            var relatedTextsToAdd = new List<RelatedDTO> ();

            foreach (var relatedText in relatedTextsInSameCategory) {
                relatedTextsToAdd.Add (new RelatedDTO {
                    TextId = relatedText.TextId,
                        Title = relatedText.Title
                });
            }

            return relatedTextsToAdd;
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
