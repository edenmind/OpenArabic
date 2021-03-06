using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using api.Dtos;
using api.Enums;
using api.MicroServiceFacades;
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

        public TextService () { }

        public async Task<IEnumerable<TextDto>> GetTextsCategoryAsync (TextResourceParameters textRequest) {
            var texts = await _context.Texts
                .Include (s => s.Sentences.OrderByDescending (o => o.Order))
                .ThenInclude (w => w.Words)
                .Where (t => t.Category.Equals (textRequest.Category))
                .Where (t => t.Status.Equals (PublishStates.Published.ToString ()))
                .OrderByDescending (t => t.CreatedAt)
                .Skip (textRequest.PageNumber * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();

            var textDtos = _mapper.Map<List<TextDto>> (texts);

            return textDtos;
        }

        public async Task<IEnumerable<TextDto>> GetTextsAuthorAsync (TextResourceParameters textRequest) {
            var texts = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .Where (t => t.Author.Equals (textRequest.Author))
                .OrderByDescending (t => t.CreatedAt)
                .Skip (textRequest.PageNumber * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();

            var textDtos = _mapper.Map<List<TextDto>> (texts);

            return textDtos;
        }

        public async Task<IEnumerable<TextDto>> GetTextsAsync (TextResourceParameters textRequest) {
            var texts = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .OrderByDescending (t => t.CreatedAt)
                .Skip (textRequest.PageNumber * textRequest.PageSize)
                .Take (textRequest.PageSize)
                .ToListAsync ();

            var textDtos = _mapper.Map<List<TextDto>> (texts);

            return textDtos;
        }

        public async Task<TextDto> GetTextAsync (long id) {
            var text = await _context.Texts
                .Include (s => s.Sentences)
                .ThenInclude (w => w.Words)
                .Where (t => t.TextId == id)
                .FirstAsync ();

            var textDto = _mapper.Map<TextDto> (text);

            foreach (var sentence in textDto.Sentences)
                if (!string.IsNullOrWhiteSpace (sentence.Arabic)) {
                    sentence.Arabic = await _tashkeelFacade.GetTashkeelAsync (sentence.Arabic).ConfigureAwait (false);
                }

            textDto.RelatedTexts = await FindRelatedTexts (text).ConfigureAwait (false);

            textDto.VocabularyCollection = ProduceVocabularies (text);

            return textDto;
        }

        public async Task<long> PostTextAsync (Text text) {
            text.CreatedAt = DateTime.Now;

            await _context.Texts.AddAsync (text);
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

        public async Task<int> GetTotalCountCategory (string category) {
            var texts = await _context.Texts
                .Where (c => c.Category.Equals (category))
                .ToListAsync ();

            var totalNumberOfTexts = texts.Count;

            return totalNumberOfTexts;
        }

        private static VocabularyCollectionDto ProduceVocabularies (Text text) {
            var vocabularies = new VocabularyCollectionDto { Arabic = new List<VocabularyDto> (), English = new List<VocabularyDto> () };

            var numberOfSentences = text.Sentences.Count;
            int numberOfVocabulariesToAdd = numberOfSentences > 6 ? 5 : numberOfSentences - 1;

            while (vocabularies.Arabic.Count < numberOfVocabulariesToAdd) {
                var randomNumber = new Random ();
                var randomSentenceId = randomNumber.Next (0, text.Sentences.Count);
                var randomWordPair = GetRandomWordPairFromSentences (randomSentenceId, text.Sentences);

                var isWordLengthSatisfied = CheckWordLength (randomWordPair);
                var isNewWordInCollection = CheckIfWordpairIsInCollection (vocabularies, randomWordPair);

                var allConditionsSatisfied = isWordLengthSatisfied && isNewWordInCollection;

                if (!allConditionsSatisfied) continue;

                vocabularies.English.Add (new VocabularyDto {
                    Word = randomWordPair.English,
                        WordId = vocabularies.English.Count
                });

                vocabularies.Arabic.Add (new VocabularyDto {
                    Word = randomWordPair.Arabic,
                        WordId = vocabularies.Arabic.Count
                });
            }

            // Shuffle vocabulary lists so that arabic and english words don't appear in the same order
            vocabularies.Arabic = ShuffleVocabularies (vocabularies.Arabic);
            vocabularies.English = ShuffleVocabularies (vocabularies.English);

            return vocabularies;
        }

        private static bool CheckIfWordpairIsInCollection (VocabularyCollectionDto vocabularies, WordPairDto wordPair) {
            var isNewWordInCollection =
                vocabularies.English.All (v => v.Word != wordPair.English) ||
                vocabularies.Arabic.All (v => v.Word != wordPair.Arabic);
            return isNewWordInCollection;
        }

        private static bool CheckWordLength (WordPairDto wordPair) {
            const int minimumWordLength = 2;
            const int maximumWordLength = 10;

            var isWordLengthSatisfied =
                wordPair.Arabic.Length > minimumWordLength &&
                wordPair.English.Length > minimumWordLength &&
                wordPair.Arabic.Length < maximumWordLength &&
                wordPair.English.Length < maximumWordLength;
            return isWordLengthSatisfied;
        }

        private static List<VocabularyDto> ShuffleVocabularies (IEnumerable<VocabularyDto> vocabularyToShuffle) {
            var random = new Random ();
            var shuffled = vocabularyToShuffle.OrderBy (i => random.Next ()).ToList ();

            return shuffled;
        }

        private static WordPairDto GetRandomWordPairFromSentences (int randomSentenceId, IReadOnlyList<Sentence> sentences) {
            WordPairDto vocabularyDto = new ();

            var random = new Random ();
            var wordsCount = sentences[randomSentenceId].Words.Count;
            var randomWordId = random.Next (0, wordsCount);

            vocabularyDto.English = sentences[randomSentenceId].Words[randomWordId].English;
            vocabularyDto.Arabic = sentences[randomSentenceId].Words[randomWordId].Arabic;

            return vocabularyDto;
        }

        private async Task<List<RelatedDto>> FindRelatedTexts (Text text) {
            const int numberOfRelatedTextsToAdd = 7;

            var relatedTextsInSameCategory = await _context.Texts
                .Where (c => c.Category == text.Category)
                .Where (i => i.TextId != text.TextId)
                .Take (numberOfRelatedTextsToAdd)
                .ToListAsync ();

            return relatedTextsInSameCategory.Select (relatedText => new RelatedDto {
                    TextId = relatedText.TextId,
                        Title = relatedText.Title
                })
                .ToList ();
        }
    }
}
