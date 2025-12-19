import { Component, computed } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-editor-card',
  imports: [],
  templateUrl: './blog-editor-card.html',
  styleUrl: './blog-editor-card.scss',
})
export class BlogEditorCard {
  // Computed signal that derives from the service's blogs signal
  public readonly blogs = computed(() => this.blogService.blogs());

  constructor(private blogService: BlogService) {}

  /**
   * Handle edit action for a blog
   */
  public onEdit(index: number): void {
    console.log('Edit blog at index:', index);
    // TODO: Navigate to edit view
  }

  /**
   * Handle delete action for a blog
   */
  public onDelete(index: number): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(index);
    }
  }

  /**
   * Format date for display
   */
  public formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}