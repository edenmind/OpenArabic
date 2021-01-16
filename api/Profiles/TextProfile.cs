using api.Dtos;
using api.Models;

using AutoMapper;

namespace api.Profiles {
    public class TextProfile : Profile {
        public TextProfile () {
            CreateMap<Text, TextDTO> ();
        }
    }
}
