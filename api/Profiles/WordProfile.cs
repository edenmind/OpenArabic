using api.Dtos;
using api.Models;

using AutoMapper;

namespace api.Profiles {
    public class WordsProfile : Profile {
        public WordsProfile () {
            CreateMap<Word, WordDto> ();
        }
    }
}
