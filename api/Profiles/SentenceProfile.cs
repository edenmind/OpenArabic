using api.Dtos;
using api.Models;
using AutoMapper;

namespace api.Profiles
{
    public class SentenceProfile : Profile
    {
        public SentenceProfile()
        {
            CreateMap<Sentence, SentenceDTO>();
        }
    }
}