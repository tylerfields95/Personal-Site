using AutoMapper;
using PersonalSite.Api.Dtos;
using PersonalSite.Api.Models;

namespace PersonalSite.Api
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile() {
            CreateMap<Blog, BlogDto>().ReverseMap();
            CreateMap<BlogContent, BlogContentDto>().ReverseMap();
        }
    }
}
