using api.Dtos;
using api.Models;

using AutoMapper;

namespace api.Profiles {
    public class TextsProfile : Profile {
        public TextsProfile () {
            CreateMap<Text, TextDTO> ();
        }
    }
}
