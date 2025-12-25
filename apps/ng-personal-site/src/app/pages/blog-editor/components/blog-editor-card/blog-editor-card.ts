import { Component, computed, output } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { BlogEditorHeader } from '../blog-editor-header/blog-editor-header';
import { ConfirmationPopover, PopoverPosition, PopoverVariant } from '../../../../components/confirmation-popover/confirmation-popover';

@Component({
  selector: 'app-blog-editor-card',
  imports: [BlogEditorHeader, ConfirmationPopover],
  templateUrl: './blog-editor-card.html',
  styleUrl: './blog-editor-card.scss',
})
export class BlogEditorCard {
  readonly add = output<void>();
  readonly edit = output<number>();

  // Expose enums to template
  readonly PopoverPosition = PopoverPosition;
  readonly PopoverVariant = PopoverVariant;

  // Computed signal that derives from the service's blogs signal
  public readonly blogs = computed(() => this.blogService.blogs());

  constructor(private blogService: BlogService) {}

  /**
   * Handle add action from header
   */
  public onAdd(): void {
    this.add.emit();
  }

  /**
   * Handle preview action for a blog
   */
  public onPreview(index: number): void {
    console.log('Preview blog at index:', index);
    // TODO: Navigate to preview view
  }

  /**
   * Handle edit action for a blog
   */
  public onEdit(index: number): void {
    this.edit.emit(index);
  }

  /**
   * Handle delete action for a blog
   */
  public onDelete(index: number): void {
    this.blogService.deleteBlog(index);
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
