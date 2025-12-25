import { Component, signal, inject } from '@angular/core';
import { BlogEditorCard } from './components/blog-editor-card/blog-editor-card';
import { Modal } from '../../components/modal/modal';
import { BlogEditorForm, BlogFormData } from './components/blog-editor-form/blog-editor-form';
import { BlogService } from '../../services/blog.service';
import { BlogContent } from '../../models/blogContent';

@Component({
  selector: 'app-blog-editor',
  imports: [BlogEditorCard, Modal, BlogEditorForm],
  templateUrl: './blog-editor.html',
  styleUrl: './blog-editor.scss',
})
export class BlogEditor {
  private readonly blogService = inject(BlogService);

  isModalOpen = signal(false);
  editingBlogIndex = signal<number | null>(null);
  editingBlogData = signal<BlogFormData | undefined>(undefined);

  openModal(): void {
    this.editingBlogIndex.set(null);
    this.editingBlogData.set(undefined);
    this.isModalOpen.set(true);
  }

  openEditModal(index: number): void {
    const blog = this.blogService.getBlogByIndex(index);
    if (blog) {
      this.editingBlogIndex.set(index);
      this.editingBlogData.set({
        header: blog.header,
        subHeader: blog.subHeader,
        author: blog.author,
      });
      this.isModalOpen.set(true);
    }
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.editingBlogIndex.set(null);
    this.editingBlogData.set(undefined);
  }

  onFormSubmit(formData: BlogFormData): void {
    const editIndex = this.editingBlogIndex();

    if (editIndex !== null) {
      // Update existing blog
      const existingBlog = this.blogService.getBlogByIndex(editIndex);
      if (existingBlog) {
        const updatedBlog = new BlogContent();
        updatedBlog.header = formData.header;
        updatedBlog.subHeader = formData.subHeader;
        updatedBlog.author = formData.author;
        updatedBlog.createdOn = existingBlog.createdOn; // Keep original created date
        updatedBlog.lastModifiedOn = new Date();
        updatedBlog.body = existingBlog.body; // Keep existing body
        updatedBlog.headerImages = existingBlog.headerImages; // Keep existing images

        this.blogService.updateBlog(editIndex, updatedBlog);
      }
    } else {
      // Create new blog
      const newBlog = new BlogContent();
      newBlog.header = formData.header;
      newBlog.subHeader = formData.subHeader;
      newBlog.author = formData.author;
      newBlog.createdOn = new Date(); // Set created date to now
      newBlog.lastModifiedOn = new Date();
      newBlog.body = [];

      this.blogService.addBlog(newBlog);
    }

    this.closeModal();
  }

  onFormCancel(): void {
    this.closeModal();
  }

  get isEditing(): boolean {
    return this.editingBlogIndex() !== null;
  }

  get modalTitle(): string {
    return this.isEditing ? 'Edit Blog' : 'Add New Blog';
  }
}
