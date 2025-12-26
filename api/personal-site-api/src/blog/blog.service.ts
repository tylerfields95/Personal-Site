import { Injectable } from '@nestjs/common';
import { BlogContentDto } from './dto/blog-content.dto';
import { BlogBodyDto } from './dto/blog-body.dto';

@Injectable()
export class BlogService {
  private blogs: BlogContentDto[] = [];

  constructor() {
    this.initializeMockBlogs();
  }

  private initializeMockBlogs(): void {
    this.blogs = [
      this.createMockBlog(
        'Welcome to My Personal Site',
        'An introduction to who I am and what I do',
        'Tyler Fields',
        new Date('2024-01-15'),
        new Date('2024-01-20')
      ),
      this.createMockBlog(
        'Building Modern Web Applications',
        'A deep dive into Angular and TypeScript',
        'Tyler Fields',
        new Date('2024-02-01'),
        new Date('2024-02-05')
      ),
      this.createMockBlog(
        'The Art of Clean Code',
        'Best practices for maintainable software',
        'Tyler Fields',
        new Date('2024-03-10'),
        new Date('2024-03-12')
      ),
      this.createMockBlog(
        'Advanced RxJS Patterns',
        'Mastering reactive programming in Angular',
        'Tyler Fields',
        new Date('2024-04-05'),
        new Date('2024-04-08')
      ),
      this.createMockBlog(
        'CSS Grid and Flexbox',
        'Modern layout techniques for responsive design',
        'Tyler Fields',
        new Date('2024-05-12'),
        new Date('2024-05-15')
      ),
      this.createMockBlog(
        'Understanding Angular Signals',
        'A new era of reactivity in Angular',
        'Tyler Fields',
        new Date('2024-06-20'),
        new Date('2024-06-22')
      ),
      this.createMockBlog(
        'Testing Strategies for Frontend Apps',
        'Unit, integration, and e2e testing best practices',
        'Tyler Fields',
        new Date('2024-07-10'),
        new Date('2024-07-14')
      ),
      this.createMockBlog(
        'Performance Optimization Tips',
        'Making your web apps blazingly fast',
        'Tyler Fields',
        new Date('2024-08-05'),
        new Date('2024-08-07')
      ),
      this.createMockBlog(
        'State Management Patterns',
        'Comparing different approaches to managing application state',
        'Tyler Fields',
        new Date('2024-09-01'),
        new Date('2024-09-03')
      ),
      this.createMockBlog(
        'Building Accessible Web Applications',
        'Creating inclusive experiences for all users',
        'Tyler Fields',
        new Date('2024-10-15'),
        new Date('2024-10-18')
      ),
      this.createMockBlog(
        'Micro Frontends Architecture',
        'Scaling frontend development with modular architecture',
        'Tyler Fields',
        new Date('2024-11-01'),
        new Date('2024-11-05')
      ),
      this.createMockBlog(
        'TypeScript Advanced Types',
        'Leveraging the type system for better code',
        'Tyler Fields',
        new Date('2024-12-10'),
        new Date('2024-12-12')
      ),
      this.createMockBlog(
        'CI/CD for Frontend Projects',
        'Automating your deployment pipeline',
        'Tyler Fields',
        new Date('2025-01-05'),
        new Date('2025-01-08')
      ),
    ];
  }

  private createMockBlog(
    header: string,
    subHeader: string,
    author: string,
    createdOn: Date,
    lastModifiedOn: Date
  ): BlogContentDto {
    const blog = new BlogContentDto();
    blog.header = header;
    blog.subHeader = subHeader;
    blog.author = author;
    blog.createdOn = createdOn;
    blog.lastModifiedOn = lastModifiedOn;

    blog.body = [
      {
        header: 'Introduction',
        subHeader: 'Getting started',
        body: '## Introduction\n\nThis is a sample blog post with **markdown** content.\n\n- Point 1\n- Point 2\n- Point 3',
        blogImages: [],
      },
      {
        header: 'Main Content',
        subHeader: 'The details',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        blogImages: [],
      },
    ];

    return blog;
  }

  getAllBlogs(): BlogContentDto[] {
    return this.blogs;
  }

  getBlogByIndex(index: number): BlogContentDto | undefined {
    return this.blogs[index];
  }
}
