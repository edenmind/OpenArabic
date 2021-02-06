using System.Collections.Generic;

namespace api.Dtos
{
    public class VocabularyCollectionDTO
    {
        public List<VocabularyDTO> Arabic { get; set; }

        public List<VocabularyDTO> English { get; set; }
    }
}