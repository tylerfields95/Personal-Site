namespace PersonalSite.Api.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? SubTitle { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public ICollection<BlogContent> Contents { get; set; } = new List<BlogContent>();
    }
}
