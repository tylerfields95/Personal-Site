import { Injectable, signal, computed, inject } from '@angular/core';
import { BlogContent, Blogbody, blogImage, ImagePosition } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiService = inject(ApiService);

  // Private writable signal for the blog list
  private readonly _blogs = signal<BlogContent[]>([]);

  // Public readonly computed signal for accessing blogs
  public readonly blogs = computed(() => this._blogs());

  constructor() {
    // Load blogs from API
    this.loadBlogsFromApi();
  }

  /**
   * Load blogs from the API
   */
  private loadBlogsFromApi(): void {
    this.apiService.getAllBlogs().subscribe({
      next: (blogs) => {
        this._blogs.set(blogs);
      },
      error: (error) => {
        console.error('Error loading blogs from API:', error);
      },
    });
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
