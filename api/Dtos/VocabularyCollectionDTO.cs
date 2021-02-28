using System.Collections.Generic;

namespace api.Dtos {
    public class VocabularyCollectionDto {
        public List<VocabularyDto> Arabic { get; set; }

        public List<VocabularyDto> English { get; set; }
    }
}
