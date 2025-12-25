import { Component, signal, model, ViewChild, ElementRef, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownToolbar } from './components/markdown-toolbar/markdown-toolbar';

@Component({
  selector: 'app-markdown-editor',
  imports: [FormsModule, MarkdownModule, MarkdownToolbar],
  templateUrl: './markdown-editor.html',
  styleUrl: './markdown-editor.scss',
})
export class MarkdownEditor {
  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  readonly content = model<string>('');
  readonly isPreview = signal(false);
  readonly minHeight = input<string>('50dvh');

  /**
   * Toggle between edit and preview mode
   */
  togglePreview(): void {
    this.isPreview.update((v) => !v);
  }

  /**
   * Insert markdown syntax at cursor position or wrap selection
   */
  private insertAtCursor(textarea: HTMLTextAreaElement, before: string, after = ''): void {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    this.content.set(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
  }

  /**
   * Insert markdown at the beginning of each selected line
   */
  private insertAtLineStart(
    textarea: HTMLTextAreaElement,
    prefix: string,
    placeholder = ''
  ): void {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Find line boundaries
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = text.indexOf('\n', end);
    const finalLineEnd = lineEnd === -1 ? text.length : lineEnd;

    const selectedLines = text.substring(lineStart, finalLineEnd);
    const hasPrefix = selectedLines.trimStart().startsWith(prefix);

    let newLines: string;
    if (hasPrefix) {
      // Remove prefix
      newLines = selectedLines
        .split('\n')
        .map((line) => line.replace(new RegExp(`^\\s*${prefix}\\s*`), ''))
        .join('\n');
    } else {
      // Add prefix
      newLines = selectedLines
        .split('\n')
        .map((line) => (line.trim() ? prefix + ' ' + line.trimStart() : line))
        .join('\n');

      // If no text selected, add placeholder
      if (!selectedLines.trim()) {
        newLines = prefix + ' ' + placeholder;
      }
    }

    const newText = text.substring(0, lineStart) + newLines + text.substring(finalLineEnd);
    this.content.set(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = lineStart + newLines.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
  }

  /**
   * Get the textarea element
   */
  private getTextarea(): HTMLTextAreaElement | null {
    return this.textareaRef?.nativeElement || null;
  }

  /**
   * Format toolbar actions
   */
  onBold(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtCursor(textarea, '**', '**');
  }

  onItalic(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtCursor(textarea, '_', '_');
  }

  onStrikethrough(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtCursor(textarea, '~~', '~~');
  }

  onCode(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtCursor(textarea, '`', '`');
  }

  onCodeBlock(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtCursor(textarea, '\n```\n', '\n```\n');
  }

  onHeading(level: number): void {
    const textarea = this.getTextarea();
    if (textarea) {
      const prefix = '#'.repeat(level);
      this.insertAtLineStart(textarea, prefix, 'Heading');
    }
  }

  onQuote(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtLineStart(textarea, '>', 'Quote');
  }

  onUnorderedList(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtLineStart(textarea, '-', 'List item');
  }

  onOrderedList(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtLineStart(textarea, '1.', 'List item');
  }

  onLink(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtCursor(textarea, '[', '](url)');
  }

  onImage(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtCursor(textarea, '![alt text](', ')');
  }

  onTable(): void {
    const textarea = this.getTextarea();
    if (textarea) {
      const table = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;
      this.insertAtCursor(textarea, table);
    }
  }

  onHorizontalRule(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtCursor(textarea, '\n\n---\n\n');
  }

  onTaskList(): void {
    const textarea = this.getTextarea();
    if (textarea) this.insertAtLineStart(textarea, '- [ ]', 'Task item');
  }
}
