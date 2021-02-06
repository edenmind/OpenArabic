using api.Dtos;
using api.Models;
using AutoMapper;

namespace api.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Word, WordDTO>();
            CreateMap<Text, TextDTO>();
            CreateMap<Sentence, SentenceDTO>();
            CreateMap<Related, RelatedDTO>();
            CreateMap<Mail, MailDTO>();
        }
    }
}