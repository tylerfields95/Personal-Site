import { Component, signal, computed, inject } from '@angular/core';
import { BlogEditorCard } from './components/blog-editor-card/blog-editor-card';
import { Modal } from '../../components/modal/modal';
import { MarkdownEditor } from '../../components/markdown-editor/markdown-editor';
import { NgxsmkDatepickerComponent } from 'ngxsmk-datepicker';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-blog-editor',
  imports: [BlogEditorCard, Modal, MarkdownEditor, NgxsmkDatepickerComponent],
  templateUrl: './blog-editor.html',
  styleUrl: './blog-editor.scss',
})
export class BlogEditor {
  private readonly themeService = inject(Theme);

  isModalOpen = signal(false);
  blogContent = signal('');
  publishDate = signal<Date | null>(null);

  // Compute datepicker theme from app theme
  datePickerTheme = computed(() => this.themeService.isDarkTheme() ? 'dark' : 'light');

  datePickerClasses = signal({
    inputGroup: 'rounded-lg border border-theme-tertiary bg-theme-secondary',
    input: 'px-3 py-2 text-sm text-theme-primary-text bg-theme-secondary placeholder:text-theme-secondary-text',
    popover: 'bg-theme-secondary border border-theme-tertiary rounded-lg shadow-lg',
    dayCell: 'hover:bg-theme-tertiary text-theme-primary-text',
    todayCell: 'border border-accent',
    selectedCell: 'bg-accent text-white',
    footer: 'flex justify-end gap-2 px-4 py-3 border-t border-theme-tertiary',
    clearBtn: 'px-3 py-2 text-sm text-theme-secondary-text hover:bg-theme-tertiary rounded transition-all',
    closeBtn: 'px-3 py-2 text-sm bg-accent text-white hover:bg-accent-muted rounded transition-all',
  });

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onDateChange(value: Date | { start: Date; end: Date } | Date[] | null): void {
    // For single mode, value will be a Date or null
    if (value instanceof Date) {
      this.publishDate.set(value);
    } else {
      this.publishDate.set(null);
    }
  }
}
