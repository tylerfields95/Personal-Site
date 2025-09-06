namespace PersonalSite.Api.Models
{
    public class BlogContent
    {
        public int Id { get; set; }
        public int BlogId { get; set; }
        public string? Header { get; set; }
        public string? SubHeader { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
