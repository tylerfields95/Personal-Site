import { Component, signal } from '@angular/core';
import { BlogEditorCard } from './components/blog-editor-card/blog-editor-card';
import { Modal } from '../../components/modal/modal';
import { MarkdownEditor } from '../../components/markdown-editor/markdown-editor';

@Component({
  selector: 'app-blog-editor',
  imports: [BlogEditorCard, Modal, MarkdownEditor],
  templateUrl: './blog-editor.html',
  styleUrl: './blog-editor.scss',
})
export class BlogEditor {
  isModalOpen = signal(false);
  blogContent = signal('');

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
}
