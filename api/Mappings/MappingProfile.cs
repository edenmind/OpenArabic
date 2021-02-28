using api.Dtos;
using api.Models;

using AutoMapper;

namespace api.Mappings {
    public class MappingProfile : Profile {
        public MappingProfile () {
            CreateMap<Word, WordDto> ();
            CreateMap<Text, TextDto> ();
            CreateMap<Sentence, SentenceDto> ();
            CreateMap<Related, RelatedDto> ();
            CreateMap<Mail, MailDto> ();
        }
    }
}
