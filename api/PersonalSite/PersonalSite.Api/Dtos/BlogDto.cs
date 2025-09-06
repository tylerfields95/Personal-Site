namespace PersonalSite.Api.Dtos
{
    public class BlogDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? SubTitle { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public List<BlogContentDto> Contents { get; set; } = [];
    }
}
