import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogContentDto } from './dto/blog-content.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getAllBlogs(): BlogContentDto[] {
    return this.blogService.getAllBlogs();
  }

  @Get(':index')
  getBlogByIndex(@Param('index') index: string): BlogContentDto | undefined {
    return this.blogService.getBlogByIndex(parseInt(index, 10));
  }
}
