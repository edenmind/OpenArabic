using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using api.Dtos;
using api.Enums;
using api.Facades;
using api.Models;
using api.ResourceParameters;

using AutoMapper;

using Microsoft.EntityFrameworkCore;

namespace api.Services {

    public class TextService : ITextService {
        private readonly ApiContext _context;
        private readonly IMapper _mapper;
        private readonly ITashkeelFacade _tashkeelFacade;

        public TextService (ApiContext context, IMapper mapper, ITashkeelFacade tashkeelFacade) {
            _context = context ??
                throw new ArgumentNullException (nameof (context));
            _mapper = mapper ??
                throw new ArgumentNullException (nameof (mapper));
            _tashkeelFacade = tashkeelFacade ??
                throw new ArgumentNullException (nameof (tashkeelFacade));

        }

        public TextService () {

        }

        public async Task<IEnumerable<TextDTO>> GetTextsCategoryAsync (TextResourceParameters textRequest) {

            var texts = await _context.Texts
                .Include (s => s.Sentences.OrderByDescending (s => s.Order))
                .ThenInclude (w => w.Words)
                .Where (t => t.Category.Equals (textRequest.Category))
                .Where (t => t.Status.Equals (PublishStates.Published.ToString ()))
                .OrderByDescending (t => t.CreatedAt)
                .Skip (textRequest.PageNumber * textRequest.PageSize)
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
                .Skip (textRequest.PageNumber * textRequest.PageSize)
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
                .Skip (textRequest.PageNumber * textRequest.PageSize)
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

            foreach (SentenceDTO sentence in textDTO.Sentences) {
                sentence.Arabic = _tashkeelFacade.TashkeelAsync (sentence.Arabic).Result;
            }

            textDTO.RelatedTexts = await FindRelatedTexts (text);

            textDTO.VocabularyCollection = ProduceVocabularyList (text);

            return textDTO;
        }

        private static VocabularyCollectionDTO ProduceVocabularyList (Text text) {

            VocabularyCollectionDTO vocabularies = new ();
            vocabularies.Arabic = new ();
            vocabularies.English = new ();

            const int numberOfVocabulariesToAdd = 5;

            while (vocabularies.Arabic.Count < numberOfVocabulariesToAdd) {
                var randomNumber = new Random ();
                var randomSentenceId = randomNumber.Next (0, text.Sentences.Count);
                var wordPair = GetRandomWordPairFromSentences (randomSentenceId, text.Sentences);

                const int minimumWordLength = 2;
                const int maximumWordLength = 10;

                var isWordLengthSatisfied =
                    wordPair.Arabic.Length > minimumWordLength && wordPair.English.Length > minimumWordLength &&
                    wordPair.Arabic.Length < maximumWordLength && wordPair.English.Length < maximumWordLength;

                var isNewWordInCollection = !vocabularies.English.Any (v => v.Word == wordPair.English) ||
                    !vocabularies.Arabic.Any (v => v.Word == wordPair.Arabic);

                if (isWordLengthSatisfied && isNewWordInCollection) {

                    vocabularies.English.Add (new VocabularyDTO {
                        Word = wordPair.English,
                            WordId = vocabularies.English.Count
                    });

                    vocabularies.Arabic.Add (new VocabularyDTO {
                        Word = wordPair.Arabic,
                            WordId = vocabularies.Arabic.Count
                    });
                }
            }

            // Shuffle vocabulary lists so that arabic and english words don't appear in the same order
            vocabularies.Arabic = ShuffledVocabularies (vocabularies.Arabic);
            vocabularies.English = ShuffledVocabularies (vocabularies.English);

            return vocabularies;
        }

        private static List<VocabularyDTO> ShuffledVocabularies (List<VocabularyDTO> toShuffle) {

            var random = new Random ();
            var shuffled = toShuffle.OrderBy (i => random.Next ()).ToList ();

            return shuffled;
        }

        private static WordPairDTO GetRandomWordPairFromSentences (int randomSentenceId, List<Sentence> sentences) {

            WordPairDTO vocabularyDTO = new ();

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

        public async Task<int> GetTotalCountAuthor (string author) {

            var texts = await _context.Texts
                .Where (a => a.Author.Equals (author))
                .ToListAsync ();

            var totalNumberOfTexts = texts.Count;

            return totalNumberOfTexts;

        }

        public async Task<int> GetTotalCountCatgory (string category) {

            var texts = await _context.Texts
                .Where (c => c.Category.Equals (category))
                .ToListAsync ();

            var totalNumberOfTexts = texts.Count;

            return totalNumberOfTexts;

        }
    }
}
