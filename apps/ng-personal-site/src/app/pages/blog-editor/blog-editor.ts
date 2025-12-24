import { Component, signal } from '@angular/core';
import { BlogEditorCard } from './components/blog-editor-card/blog-editor-card';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-blog-editor',
  imports: [BlogEditorCard, Modal],
  templateUrl: './blog-editor.html',
  styleUrl: './blog-editor.scss',
})
export class BlogEditor {
  isModalOpen = signal(false);

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
}
