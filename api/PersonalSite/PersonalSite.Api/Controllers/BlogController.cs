using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Api.Dtos;
using PersonalSite.Api.Models;

namespace PersonalSite.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public BlogController(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogDto>>> GetAll(CancellationToken ct)
        {
            var blogs = await _db.Set<Blog>()
                .AsNoTracking()
                .Include(b => b.Contents)
                .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(b => b.CreatedOn)
                .ToListAsync(ct);

            return Ok(blogs);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BlogDto>> GetById(int id, CancellationToken ct)
        {
            var blog = await _db.Set<Blog>()
                .AsNoTracking()
                .Include(b => b.Contents)
                .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(b => b.Id == id, ct);

            if (blog is null) return NotFound();
            return Ok(blog);
        }


        [HttpPost]
        public async Task<ActionResult<BlogDto>> Create([FromBody] BlogDto dto, CancellationToken ct)
        {
            if (dto is null) return BadRequest("Blog Object not provided");

            // Map DTO -> entity
            var entity = _mapper.Map<Blog>(dto);

            // Server-side timestamps and IDs
            var nowUtc = DateTime.UtcNow;
            entity.Id = 0; // ensure insert
            entity.CreatedOn = nowUtc;
            entity.UpdatedOn = nowUtc;

            // initialize content list
            if (entity.Contents != null)
            {
                foreach (var c in entity.Contents)
                {
                    c.Id = 0; // ensure insert
                    c.BlogId = 0; // EF will set after FK materializes
                    c.CreatedOn = nowUtc;
                    c.UpdatedOn = nowUtc;
                }
            }

            // Persist
            _db.Set<Blog>().Add(entity);
            await _db.SaveChangesAsync(ct);

            // Reload with children to return consistent DTO
            var result = await _db.Set<Blog>()
                .AsNoTracking()
                .Include(b => b.Contents)
                .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
                .FirstAsync(b => b.Id == entity.Id, ct);

            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<BlogDto>> Update([FromBody] BlogDto dto, CancellationToken ct)
        {
            if (dto == null || dto.Id == null)
                return BadRequest("Invalid request body or ID mismatch.");

            var entity = await _db.Set<Blog>()
                .Include(b => b.Contents)
                .FirstOrDefaultAsync(b => b.Id == dto.Id, ct);

            // dont procede if there isnt a blog to edit
            if (entity == null)
                return NotFound();

            var now = DateTime.UtcNow;

            // Update blog fields
            entity.Title = dto.Title;
            entity.SubTitle = dto.SubTitle;
            entity.UpdatedOn = now;

            var contentsToAdd = dto.Contents.Where(x => x.Id == 0).ToList();
            var contentsToUpdate = dto.Contents.Where(x => x.Id > 0).ToList();

            var existingById = entity.Contents.ToDictionary(c => c.Id);

            // Update existing Contents
            foreach (var cDto in contentsToUpdate)
            {
                if (!existingById.TryGetValue(cDto.Id, out var cEntity))
                {
                    return BadRequest($"Content item does not exist for this blog.");
                }

                cEntity.Header = cDto.Header;
                cEntity.SubHeader = cDto.SubHeader;
                cEntity.Content = cDto.Content;
                cEntity.UpdatedOn = now;
            }

            // any additional content sections that were added in the edit will drop in here
            foreach (var cDto in contentsToAdd)
            {
                var cEntity = _mapper.Map<BlogContent>(cDto);
                cEntity.Id = 0;
                cEntity.BlogId = entity.Id;
                cEntity.CreatedOn = now;
                cEntity.UpdatedOn = now;
                entity.Contents.Add(cEntity);
            }

            await _db.SaveChangesAsync(ct);

            // Reload for return
            var updated = await _db.Set<Blog>()
                .AsNoTracking()
                .Include(b => b.Contents)
                .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
                .FirstAsync(b => b.Id == entity.Id, ct);

            return Ok(updated);
        }

        // DELETE: api/blog/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteBlog(int id, CancellationToken ct)
        {
            var blog = await _db.Set<Blog>().FirstOrDefaultAsync(b => b.Id == id, ct);
            if (blog is null) return NotFound();

            _db.Remove(blog);                  // relies on FK cascade for BlogContent
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        // DELETE: api/blog/content/123
        [HttpDelete("content/{contentId:int}")]
        public async Task<IActionResult> DeleteBlogContent(int contentId, CancellationToken ct)
        {
            var content = await _db.Set<BlogContent>().FirstOrDefaultAsync(c => c.Id == contentId, ct);
            if (content is null) return NotFound();

            // optional: bump parent UpdatedOn
            var blog = await _db.Set<Blog>().FirstOrDefaultAsync(b => b.Id == content.BlogId, ct);
            if (blog is not null) blog.UpdatedOn = DateTime.UtcNow;

            _db.Remove(content);
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

    }
}
