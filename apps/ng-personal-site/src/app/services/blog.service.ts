import { Injectable, signal, computed } from '@angular/core';
import { BlogContent, Blogbody, blogImage, ImagePosition } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // Private writable signal for the blog list
  private readonly _blogs = signal<BlogContent[]>([]);

  // Public readonly computed signal for accessing blogs
  public readonly blogs = computed(() => this._blogs());

  constructor() {
    // Initialize with mock data
    this._initializeMockBlogs();
  }

  /**
   * Initialize the service with mock blog data
   */
  private _initializeMockBlogs(): void {
    const mockBlogs: BlogContent[] = [
      this._createMockBlog(
        'Welcome to My Personal Site',
        'An introduction to who I am and what I do',
        'Tyler Fields',
        new Date('2024-01-15'),
        new Date('2024-01-20')
      ),
      this._createMockBlog(
        'Building Modern Web Applications',
        'A deep dive into Angular and TypeScript',
        'Tyler Fields',
        new Date('2024-02-01'),
        new Date('2024-02-05')
      ),
      this._createMockBlog(
        'The Art of Clean Code',
        'Best practices for maintainable software',
        'Tyler Fields',
        new Date('2024-03-10'),
        new Date('2024-03-12')
      ),
      this._createMockBlog(
        'Advanced RxJS Patterns',
        'Mastering reactive programming in Angular',
        'Tyler Fields',
        new Date('2024-04-05'),
        new Date('2024-04-08')
      ),
      this._createMockBlog(
        'CSS Grid and Flexbox',
        'Modern layout techniques for responsive design',
        'Tyler Fields',
        new Date('2024-05-12'),
        new Date('2024-05-15')
      ),
      this._createMockBlog(
        'Understanding Angular Signals',
        'A new era of reactivity in Angular',
        'Tyler Fields',
        new Date('2024-06-20'),
        new Date('2024-06-22')
      ),
      this._createMockBlog(
        'Testing Strategies for Frontend Apps',
        'Unit, integration, and e2e testing best practices',
        'Tyler Fields',
        new Date('2024-07-10'),
        new Date('2024-07-14')
      ),
      this._createMockBlog(
        'Performance Optimization Tips',
        'Making your web apps blazingly fast',
        'Tyler Fields',
        new Date('2024-08-05'),
        new Date('2024-08-07')
      ),
      this._createMockBlog(
        'State Management Patterns',
        'Comparing different approaches to managing application state',
        'Tyler Fields',
        new Date('2024-09-01'),
        new Date('2024-09-03')
      ),
      this._createMockBlog(
        'Building Accessible Web Applications',
        'Creating inclusive experiences for all users',
        'Tyler Fields',
        new Date('2024-10-15'),
        new Date('2024-10-18')
      ),
      this._createMockBlog(
        'Micro Frontends Architecture',
        'Scaling frontend development with modular architecture',
        'Tyler Fields',
        new Date('2024-11-01'),
        new Date('2024-11-05')
      ),
      this._createMockBlog(
        'TypeScript Advanced Types',
        'Leveraging the type system for better code',
        'Tyler Fields',
        new Date('2024-12-10'),
        new Date('2024-12-12')
      ),
      this._createMockBlog(
        'CI/CD for Frontend Projects',
        'Automating your deployment pipeline',
        'Tyler Fields',
        new Date('2025-01-05'),
        new Date('2025-01-08')
      ),
    ];

    this._blogs.set(mockBlogs);
  }

  /**
   * Helper method to create mock blog content
   */
  private _createMockBlog(
    header: string,
    subHeader: string,
    author: string,
    createdOn: Date,
    lastModifiedOn: Date
  ): BlogContent {
    const blog = new BlogContent();
    blog.header = header;
    blog.subHeader = subHeader;
    blog.author = author;
    blog.createdOn = createdOn;
    blog.lastModifiedOn = lastModifiedOn;

    // Add some mock body content
    blog.body = [
      new Blogbody({
        header: 'Introduction',
        subHeader: 'Getting started',
        body: '## Introduction\n\nThis is a sample blog post with **markdown** content.\n\n- Point 1\n- Point 2\n- Point 3',
        blogImages: [],
      }),
      new Blogbody({
        header: 'Main Content',
        subHeader: 'The details',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        blogImages: [],
      }),
    ];

    return blog;
  }

  /**
   * Get all blogs
   */
  public getAllBlogs(): BlogContent[] {
    return this._blogs();
  }

  /**
   * Get a blog by index (simulating ID lookup)
   */
  public getBlogByIndex(index: number): BlogContent | undefined {
    return this._blogs()[index];
  }

  /**
   * Add a new blog
   */
  public addBlog(blog: BlogContent): void {
    this._blogs.update((blogs) => [...blogs, blog]);
  }

  /**
   * Update an existing blog by index
   */
  public updateBlog(index: number, updatedBlog: BlogContent): void {
    this._blogs.update((blogs) => {
      const newBlogs = [...blogs];
      if (index >= 0 && index < newBlogs.length) {
        newBlogs[index] = updatedBlog;
      }
      return newBlogs;
    });
  }

  /**
   * Delete a blog by index
   */
  public deleteBlog(index: number): void {
    this._blogs.update((blogs) => blogs.filter((_, i) => i !== index));
  }
}
